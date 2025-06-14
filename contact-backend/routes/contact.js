const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // POST /api/contact - Create new contact
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

    // Updated to include created_at timestamp
    const sql = "INSERT INTO contacts (name, email, message, created_at) VALUES (?, ?, ?, NOW())";
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

  // GET /api/contact - Get all contacts
  router.get("/", (req, res) => {
    // Updated to order by created_at (newest first), fallback to id if created_at is null
    const sql = "SELECT * FROM contacts ORDER BY COALESCE(created_at, FROM_UNIXTIME(0)) DESC, id DESC";
    db.query(sql, (err, results) => {
      if (err) {
        console.error("❌ Database error fetching contacts:", err);
        return res.status(500).json({ error: "Database error occurred" });
      }
      
      console.log(`✅ Retrieved ${results.length} contacts`);
      res.json({
        message: "✅ Contacts retrieved successfully",
        count: results.length,
        contacts: results
      });
    });
  });

  // GET /api/contact/search/:term - Search contacts by name or email
  // ⚠️ IMPORTANT: This MUST come BEFORE the /:id route
  router.get("/search/:term", (req, res) => {
    const { term } = req.params;
    
    if (!term || term.trim().length < 2) {
      console.log("❌ Validation failed: Search term too short");
      return res.status(400).json({ error: "Search term must be at least 2 characters" });
    }

    const searchTerm = `%${term.trim()}%`;
    // Updated to order by created_at with fallback
    const sql = "SELECT * FROM contacts WHERE name LIKE ? OR email LIKE ? ORDER BY COALESCE(created_at, FROM_UNIXTIME(0)) DESC, id DESC";
    
    db.query(sql, [searchTerm, searchTerm], (err, results) => {
      if (err) {
        console.error("❌ Database error searching contacts:", err);
        return res.status(500).json({ error: "Database error occurred" });
      }
      
      console.log(`✅ Search completed: ${results.length} contacts found for term "${term}"`);
      res.json({
        message: "✅ Search completed successfully",
        searchTerm: term,
        count: results.length,
        contacts: results
      });
    });
  });

  // GET /api/contact/:id - Get single contact by ID
  // ⚠️ IMPORTANT: This MUST come AFTER more specific routes like /search/:term
  router.get("/:id", (req, res) => {
    const { id } = req.params;
    
    // Validate ID is a number
    if (!id || isNaN(id)) {
      console.log("❌ Validation failed: Invalid contact ID");
      return res.status(400).json({ error: "Invalid contact ID" });
    }

    const sql = "SELECT * FROM contacts WHERE id = ?";
    db.query(sql, [id], (err, results) => {
      if (err) {
        console.error("❌ Database error fetching contact:", err);
        return res.status(500).json({ error: "Database error occurred" });
      }
      
      if (results.length === 0) {
        console.log(`❌ Contact not found with ID: ${id}`);
        return res.status(404).json({ error: "Contact not found" });
      }
      
      console.log(`✅ Contact retrieved successfully: ID ${id}`);
      res.json({
        message: "✅ Contact retrieved successfully",
        contact: results[0]
      });
    });
  });

  // PUT /api/contact/:id - Update contact
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, message } = req.body;
    
    // Validate ID is a number
    if (!id || isNaN(id)) {
      console.log("❌ Validation failed: Invalid contact ID");
      return res.status(400).json({ error: "Invalid contact ID" });
    }

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
    
    const sql = "UPDATE contacts SET name = ?, email = ?, message = ? WHERE id = ?";
    db.query(sql, [trimmedData.name, trimmedData.email, trimmedData.message, id], (err, result) => {
      if (err) {
        console.error("❌ Database error updating contact:", err);
        return res.status(500).json({ error: "Database error occurred" });
      }
      
      if (result.affectedRows === 0) {
        console.log(`❌ Contact not found with ID: ${id}`);
        return res.status(404).json({ error: "Contact not found" });
      }
      
      console.log(`✅ Contact updated successfully: ID ${id}`);
      res.json({ 
        message: "✅ Contact updated successfully",
        id: parseInt(id)
      });
    });
  });

  // DELETE /api/contact/:id - Delete contact
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    
    // Validate ID is a number
    if (!id || isNaN(id)) {
      console.log("❌ Validation failed: Invalid contact ID");
      return res.status(400).json({ error: "Invalid contact ID" });
    }

    const sql = "DELETE FROM contacts WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("❌ Database error deleting contact:", err);
        return res.status(500).json({ error: "Database error occurred" });
      }
      
      if (result.affectedRows === 0) {
        console.log(`❌ Contact not found with ID: ${id}`);
        return res.status(404).json({ error: "Contact not found" });
      }
      
      console.log(`✅ Contact deleted successfully: ID ${id}`);
      res.json({ 
        message: "✅ Contact deleted successfully",
        id: parseInt(id)
      });
    });
  });

  return router;
};