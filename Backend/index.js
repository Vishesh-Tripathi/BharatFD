require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const faqRoutes = require("./Routes/faqRoutes.js");
const FAQ = require("./Models/FAQ.js");  // Import your FAQ model

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// AdminBro setup
AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  resources: [
    {
      resource: FAQ,
      options: {
        options: {
          listProperties: ['question', 'answer'],
          showProperties: ['question', 'answer', 'translations'],
        }
      },
    },
  ],
  rootPath: "/admin",  // Admin panel root URL
});

// Build the admin router and use it in the Express app
const adminRouter = AdminBroExpress.buildRouter(adminBro);
app.use(adminBro.options.rootPath, adminRouter);  // Mount the admin panel at /admin

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the FAQ API");
});

app.use("/api", faqRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
