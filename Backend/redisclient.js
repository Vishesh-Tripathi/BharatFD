const { Redis } = require("@upstash/redis");

// Configure Upstash Redis with credentials
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,  // Use your Upstash Redis URL
  token: process.env.UPSTASH_REDIS_REST_TOKEN, // Use your Upstash Redis Token
});


module.exports = redis;