require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const faqRoutes = require("./Routes/faqRoutes.js");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the FAQ API");
});
app.use("/api", faqRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
