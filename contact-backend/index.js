// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MySQL connection
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Root@123',
//   database: 'ContactForm'
// });

// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to database:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

// // API route to handle contact form
// app.post('/api/contact', (req, res) => {
//   const { name, email, message } = req.body;
  
//   if (!name || !email || !message) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
//   db.query(sql, [name, email, message], (err, result) => {
//     if (err) {
//       console.error('Error saving contact:', err);
//       return res.status(500).json({ error: 'Database error' });
//     }
//     res.status(200).json({ message: 'Message saved successfully' });
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });




// railway dATA BASE COONECTION
require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Handle invalid JSON errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  next();
});

// MySQL connection
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

// Routes
const contactRoutes = require('./routes/contact')(db);
app.use('/api/contact', contactRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
