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
app.use(cors({
  origin: process.env.FRONTEND_URL || '*', // Configure this in Railway
  credentials: true
}));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Handle invalid JSON errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    console.error('❌ JSON parsing error:', err.message);
    return res.status(400).json({ error: 'Invalid JSON payload' });
  }
  next();
});

// MySQL connection with retry logic
const createDbConnection = () => {
  const db = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT || 3306,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
  });

  db.connect((err) => {
    if (err) {
      console.error('❌ Error connecting to database:', err.code);
      console.log('🔄 Will retry database connection...');
      setTimeout(createDbConnection, 5000); // Retry after 5 seconds
      return;
    }
    console.log('✅ Connected to MySQL database');
  });

  // Handle connection errors
  db.on('error', (err) => {
    console.error('❌ Database connection error:', err.code);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('🔄 Reconnecting to database...');
      createDbConnection();
    }
  });

  return db;
};

const db = createDbConnection();

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Contact Backend API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    api: 'Contact Backend',
    status: 'active',
    endpoints: [
      'GET /',
      'GET /api/status',
      'POST /api/contact'
    ]
  });
});

// Routes
try {
  const contactRoutes = require('./routes/contact')(db);
  app.use('/api/contact', contactRoutes);
  console.log('✅ Contact routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading contact routes:', error.message);
  process.exit(1);
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server - Must bind to 0.0.0.0 for Railway
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('🔄 SIGTERM received, shutting down gracefully...');
  if (db) {
    db.end(() => {
      console.log('✅ Database connection closed');
      process.exit(0);
    });
  }
});

process.on('SIGINT', () => {
  console.log('🔄 SIGINT received, shutting down gracefully...');
  if (db) {
    db.end(() => {
      console.log('✅ Database connection closed');
      process.exit(0);
    });
  }
});