const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true }, // Main question
  answer: { type: String, required: true }, // Rich text (HTML content)
  translations: {
    question_hi: String,  // Hindi translation
    question_bn: String,  // Bengali translation
    question_es: String,  // Spanish translation
    answer_hi: String,    // Hindi answer
    answer_bn: String,    // Bengali answer
    answer_es: String,    // Spanish answer
  },
});

// Model method to retrieve translated text dynamically
FAQSchema.methods.getTranslation = function (lang) {
  return {
    question: this.translations[`question_${lang}`] || this.question,
    answer: this.translations[`answer_${lang}`] || this.answer,
  };
};

module.exports = mongoose.model("FAQ", FAQSchema);
