const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // POST /api/contact
  router.post("/", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
    db.query(sql, [name, email, message], (err, result) => {
      if (err) {
        console.error("❌ Error saving contact:", err);
        return res.status(500).json({ error: "Database error" });
      }
      console.log("✅ Contact saved:", { name, email, message });
      res.status(200).json({ message: "✅ Message saved successfully" });
    });
  });

  return router;
};
