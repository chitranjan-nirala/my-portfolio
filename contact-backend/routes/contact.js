const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // POST /api/contact
  router.post("/", (req, res) => {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      console.log("❌ Validation failed: Missing required fields");
      return res.status(400).json({ error: "All fields are required" });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("❌ Validation failed: Invalid email format");
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Trim whitespace
    const trimmedData = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    };

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [trimmedData.name, trimmedData.email, trimmedData.message], (err, result) => {
      if (err) {
        console.error("❌ Database error saving contact:", err);
        return res.status(500).json({ error: "Database error occurred" });
      }
      
      console.log("✅ Contact saved successfully:", { 
        id: result.insertId,
        name: trimmedData.name, 
        email: trimmedData.email 
      });
      
      res.status(201).json({ 
        message: "✅ Message saved successfully",
        id: result.insertId 
      });
    });
  });

  // GET /api/contact (optional - for testing/debugging)
  router.get("/", (req, res) => {
    res.json({ 
      message: "Contact API endpoint is working",
      methods: ["POST /api/contact"]
    });
  });

  return router;
};