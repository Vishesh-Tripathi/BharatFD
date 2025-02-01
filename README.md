

```markdown
# FAQ API

This is an FAQ API built with Node.js, Express, MongoDB, and integrated with AdminBro for an easy-to-use admin interface. It provides a platform to manage frequently asked questions (FAQs) and supports multilingual content through dynamic translation.

## Features
- Create and manage FAQs with translations.
- Support for multiple languages.
- Admin interface for easy management of FAQs.
- Cache FAQs in Redis for better performance.

## Technologies Used
- **Node.js**: JavaScript runtime for building the backend.
- **Express.js**: Web framework for handling HTTP requests.
- **MongoDB**: NoSQL database to store FAQs.
- **AdminBro**: Admin panel to manage FAQs easily.
- **Redis**: Caching for improved performance.
- **Google Translate API**: For automatic translations of FAQs.
- **Mocha/Chai**: Testing framework.

## Installation

Follow these steps to set up the project locally:
```

### 1. Clone the repository

```bash
git clone https://github.com/your-username/faq-api.git
cd faq-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root of the project and add the following:

```plaintext
MONGO_URI=""
PORT=5000
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""
```

### 4. Run the application

```bash
npm start
```

This will start the API on `http://localhost:5000`.

## API Usage

### 1. Create FAQ

**Endpoint**: `POST /api/createfaq`

**Request Body**:
```json
{
  "question": "What is Shine Pearl?",
  "answer": "Shine Pearl is a startup providing skill development, career guidance, IT consultancy, and recruitment support."
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "_id": "faq_id",
    "question": "What is Shine Pearl?",
    "answer": "Shine Pearl is a startup providing skill development, career guidance, IT consultancy, and recruitment support.",
    "translations": {
      "question_hi": "शाइन पर्ल क्या है?",
      "answer_hi": "शाइन पर्ल एक स्टार्टअप है जो कौशल विकास, करियर मार्गदर्शन, आईटी कंसल्टेंसी, और भर्ती समर्थन प्रदान करता है।",
      "question_bn": "শাইন পার্ল কী?",
      "answer_bn": "শাইন পার্ল একটি স্টার্টআপ যা দক্ষতা উন্নয়ন, ক্যারিয়ার গাইডেন্স, আইটি কনসালটেন্সি এবং নিয়োগ সহায়তা প্রদান করে।"
    }
  }
}
```

### 2. Get All FAQs

**Endpoint**: `GET /api/getfaq?lang=LANGCODE eg.es,bn etc`

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "faq_id",
      "question": "What is Shine Pearl?",
      "answer": "Shine Pearl is a startup providing skill development, career guidance, IT consultancy, and recruitment support.",
      "translations": {
        "question_hi": "शाइन पर्ल क्या है?",
        "answer_hi": "शाइन पर्ल एक स्टार्टअप है जो कौशल विकास, करियर मार्गदर्शन, आईटी कंसल्टेंसी, और भर्ती समर्थन प्रदान करता है।",
        "question_bn": "শাইন পার্ল কী?",
        "answer_bn": "শাইন পার্ল একটি স্টার্টআপ যা দক্ষতা উন্নয়ন, ক্যারিয়ার গাইডেন্স, আইটি কনসালটেন্সি এবং নিয়োগ সহায়তা প্রদান করে।"
      }
    }
  ]
}
```



## Admin Panel

The Admin panel is built using AdminBro for managing FAQs. To access the admin panel:

1. Navigate to `http://localhost:5000/admin` in your browser.
2. Use the default login credentials:
   - **Username**: `admin`
   - **Password**: `admin`

You can manage FAQs directly from this interface, including adding new FAQs, editing existing ones, and managing translations.

## Caching

FAQs are cached using Redis for improved performance. The cache key used is `faqs:{lang}`, where `lang` is the language code (e.g., `en`, `hi`, `bn`). If cached data is available, it will be served instead of fetching from the database.

## Testing

This project uses **Mocha** and **Chai** for testing.

### Run Tests

```bash
npm test
```


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Express.js](https://expressjs.com/)
- [AdminBro](https://adminbro.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Google Translate API](https://cloud.google.com/translate)

---

