const FAQ = require("../Models/FAQ.js");

// const   translate  = require('@vitalets/google-translate-api');
const translate = require("google-translate-api-x");
const redis = require("../redisclient.js");



// 


const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;
    console.log("Original Question:", question);
    console.log("Original Answer:", answer);

    const translations = {};
    const cacheKey = `faq:${question}`;

    // Check Redis cache first
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Serving from Upstash cache...");
      return res.status(200).json({ success: true, data: JSON.parse(cachedData) });
    }

    // Correct way to extract translated text
    const questionHi = (await translate(question, { to: "hi" })).text;
    const answerHi = (await translate(answer, { to: "hi" })).text;
    const questionBn = (await translate(question, { to: "bn" })).text;
    const answerBn = (await translate(answer, { to: "bn" })).text;
    const questionEs = (await translate(question, { to: "es" })).text; 
    const answerEs = (await translate(answer, { to: "es" })).text; 

    // console.log(questionHi, answerHi, questionBn, answerBn, questionEs, answerEs);

    translations.question_hi = questionHi;
    translations.answer_hi = answerHi;
    translations.question_bn = questionBn;
    translations.answer_bn = answerBn;
    translations.question_es = questionEs;
    translations.answer_es = answerEs;

    const newFAQ = new FAQ({ question, answer, translations });
    await newFAQ.save();
    await redis.setex(cacheKey, 3600, JSON.stringify(newFAQ));

    res.status(201).json({ success: true, data: newFAQ });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
// Get all FAQs (with optional translation)
const getAllFAQs = async (req, res) => {
  try {
    const { lang } = req.query;
    const cacheKey = `faqs:${lang || "en"}`;

    // Check if data exists in Redis cache
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      console.log("Serving FAQs from Upstash cache...");
      return res.status(200).json({ success: true, data: JSON.parse(cachedData) });
    }
    const faqs = await FAQ.find();
    const translatedFAQs = faqs.map((faq) => faq.getTranslation(lang || "en"));
    res.status(200).json({ success: true, data: translatedFAQs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



module.exports = {
  createFAQ,
  getAllFAQs,
};
