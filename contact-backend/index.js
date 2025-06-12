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
// Remove dotenv requirement for Railway deployment
const express = require('express');
const mysql = require('mysql2');
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

// MySQL connection with retry logic and proper configuration
let db = null;
let connectionAttempts = 0;
const maxConnectionAttempts = 10;

const createDbConnection = () => {
  if (connectionAttempts >= maxConnectionAttempts) {
    console.error('❌ Max connection attempts reached. Exiting...');
    process.exit(1);
  }

  connectionAttempts++;
  console.log(`🔄 Database connection attempt ${connectionAttempts}/${maxConnectionAttempts}`);

  // Fixed configuration - removed invalid options
  const connectionConfig = {
    host: process.env.MYSQLHOST || 'localhost',
    user: process.env.MYSQLUSER || 'root',
    password: process.env.MYSQLPASSWORD || '',
    database: process.env.MYSQLDATABASE || 'test',
    port: process.env.MYSQLPORT || 3306,
    connectTimeout: 60000,    // ✅ Valid option
    // Removed invalid options: acquireTimeout, timeout, reconnect
  };

  console.log('🔗 Attempting to connect to database:', {
    host: connectionConfig.host,
    port: connectionConfig.port,
    user: connectionConfig.user,
    database: connectionConfig.database
  });

  db = mysql.createConnection(connectionConfig);

  db.connect((err) => {
    if (err) {
      console.error('❌ Error connecting to database:', err.code);
      console.error('❌ Error message:', err.message);
      
      // Check for specific error types
      if (err.code === 'ECONNREFUSED') {
        console.error('💡 Possible solutions:');
        console.error('   1. Check if MySQL server is running');
        console.error('   2. Verify host and port are correct');
        console.error('   3. Check firewall settings');
      } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
        console.error('💡 Check username and password credentials');
      } else if (err.code === 'ER_BAD_DB_ERROR') {
        console.error('💡 Check if database exists');
      }
      
      console.log(`🔄 Will retry database connection in 5 seconds... (${connectionAttempts}/${maxConnectionAttempts})`);
      setTimeout(createDbConnection, 5000); // Retry after 5 seconds
      return;
    }
    
    console.log('✅ Connected to MySQL database');
    console.log(`📊 Database: ${process.env.MYSQLDATABASE}`);
    console.log(`🌐 Host: ${process.env.MYSQLHOST}:${process.env.MYSQLPORT}`);
    connectionAttempts = 0; // Reset counter on successful connection
  });

  // Handle connection errors
  db.on('error', (err) => {
    console.error('❌ Database connection error:', err.code);
    console.error('❌ Error message:', err.message);
    
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
      console.log('🔄 Connection lost, attempting to reconnect...');
      createDbConnection();
    } else {
      console.error('❌ Fatal database error:', err);
    }
  });

  return db;
};

// Initialize database connection
createDbConnection();

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Contact Backend API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    api: 'Contact Backend',
    status: 'active',
    database: db && db.state === 'authenticated' ? 'connected' : 'disconnected',
    endpoints: [
      'GET /',
      'GET /api/status',
      'POST /api/contact',
      'GET /api/contact',
      'GET /api/contact/:id',
      'PUT /api/contact/:id',
      'DELETE /api/contact/:id',
      'GET /api/contact/search/:term'
    ],
    timestamp: new Date().toISOString()
  });
});

// Database health check endpoint
app.get('/api/health', (req, res) => {
  if (!db) {
    return res.status(500).json({
      status: 'unhealthy',
      database: 'disconnected',
      error: 'Database connection not initialized'
    });
  }

  db.query('SELECT 1 as health_check', (err, results) => {
    if (err) {
      console.error('❌ Database health check failed:', err);
      return res.status(500).json({
        status: 'unhealthy',
        database: 'disconnected',
        error: 'Database query failed',
        details: err.message
      });
    }
    
    res.json({
      status: 'healthy',
      database: 'connected',
      query_result: results[0],
      timestamp: new Date().toISOString()
    });
  });
});

// Middleware to check database connection before handling routes
app.use('/api/contact', (req, res, next) => {
  if (!db || db.state !== 'authenticated') {
    return res.status(503).json({
      error: 'Database not available',
      message: 'Please try again later',
      timestamp: new Date().toISOString()
    });
  }
  next();
});

// Routes
try {
  const contactRoutes = require('./routes/contact')(db);
  app.use('/api/contact', contactRoutes);
  console.log('✅ Contact routes loaded successfully');
} catch (error) {
  console.error('❌ Error loading contact routes:', error.message);
  console.error('📁 Make sure ./routes/contact.js exists');
  
  // Don't exit immediately, allow server to start for health checks
  console.log('⚠️  Server will start without contact routes');
  
  // Create a fallback route for contact endpoints
  app.use('/api/contact', (req, res) => {
    res.status(503).json({
      error: 'Contact routes not available',
      message: 'Routes could not be loaded',
      timestamp: new Date().toISOString()
    });
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('❌ Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

// Handle 404 - FIXED: Removed the problematic '*' pattern
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    availableRoutes: [
      'GET /',
      'GET /api/status',
      'GET /api/health',
      'POST /api/contact',
      'GET /api/contact',
      'GET /api/contact/:id',
      'PUT /api/contact/:id',
      'DELETE /api/contact/:id',
      'GET /api/contact/search/:term'
    ]
  });
});

// Start server - Must bind to 0.0.0.0 for Railway
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Server URL: http://0.0.0.0:${PORT}`);
  console.log(`📊 Database: ${process.env.MYSQLDATABASE || 'Not configured'}`);
  console.log('✅ Server started successfully');
  
  // Log environment variables for debugging (without sensitive data)
  console.log('🔧 Database Configuration:');
  console.log(`   Host: ${process.env.MYSQLHOST || 'localhost'}`);
  console.log(`   Port: ${process.env.MYSQLPORT || 3306}`);
  console.log(`   User: ${process.env.MYSQLUSER || 'root'}`);
  console.log(`   Database: ${process.env.MYSQLDATABASE || 'test'}`);
  console.log(`   Password: ${process.env.MYSQLPASSWORD ? '[SET]' : '[NOT SET]'}`);
});

// Handle graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`🔄 ${signal} received, shutting down gracefully...`);
  if (db) {
    db.end((err) => {
      if (err) {
        console.error('❌ Error closing database connection:', err);
      } else {
        console.log('✅ Database connection closed');
      }
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  console.error('Stack trace:', err.stack);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports = app;