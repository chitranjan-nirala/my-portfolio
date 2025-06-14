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

// Load environment variables if .env file exists
try {
  require('dotenv').config();
} catch (error) {
  console.log('📝 No dotenv package found, using system environment variables');
}

const app = express();
// FIX: Uncommented PORT variable - this was causing the issue!
const PORT = process.env.PORT || 8080; // Changed default to 8080 for Railway

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

// MySQL connection pool with proper configuration for Railway
let db = null;
let connectionAttempts = 0;
const maxConnectionAttempts = 10;

const getDbConfig = () => {
  // Check if we're in Railway production environment
  const isRailwayProduction = process.env.RAILWAY_ENVIRONMENT === 'production' || process.env.MYSQLHOST;
  
  if (isRailwayProduction) {
    // Use Railway's internal database connection with pool
    return {
      host: process.env.MYSQLHOST || 'mysql.railway.internal',
      user: process.env.MYSQLUSER || 'root',
      password: process.env.MYSQLPASSWORD || '',
      database: process.env.MYSQLDATABASE || 'railway',
      port: process.env.MYSQLPORT || 3306,
      // Connection pool settings (these are valid for pools)
      connectionLimit: 10,
      acquireTimeout: 60000,
      // Keep connection alive
      keepAliveInitialDelay: 0,
      enableKeepAlive: true,
      // Pool idle timeout
      idleTimeout: 300000, // 5 minutes
    };
  } else {
    // Use public connection for local development
    return {
      host: process.env.DB_HOST || 'interchange.proxy.rlwy.net',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'kughvUbnVrJsaQPerzzbYrZlViAxTmac',
      database: process.env.DB_NAME || 'railway',
      port: process.env.DB_PORT || 34378,
      connectionLimit: 10,
      acquireTimeout: 60000,
    };
  }
};

const createDbConnection = () => {
  if (connectionAttempts >= maxConnectionAttempts) {
    console.error('❌ Max connection attempts reached. Exiting...');
    process.exit(1);
  }

  connectionAttempts++;
  console.log(`🔄 Database connection attempt ${connectionAttempts}/${maxConnectionAttempts}`);

  const connectionConfig = getDbConfig();

  console.log('🔗 Attempting to connect to database:', {
    host: connectionConfig.host,
    port: connectionConfig.port,
    user: connectionConfig.user,
    database: connectionConfig.database
  });

  // Create connection pool instead of single connection
  db = mysql.createPool(connectionConfig);

  // Test the connection
  db.getConnection((err, connection) => {
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
      setTimeout(createDbConnection, 5000);
      return;
    }
    
    console.log('✅ Connected to MySQL database');
    console.log(`📊 Database: ${connectionConfig.database}`);
    console.log(`🌐 Host: ${connectionConfig.host}:${connectionConfig.port}`);
    console.log('🔄 Using connection pool for better reliability');
    connectionAttempts = 0; // Reset counter on successful connection
    
    // Release the test connection back to pool
    connection.release();
  });

  // Handle pool errors
  db.on('error', (err) => {
    console.error('❌ Database pool error:', err.code);
    console.error('❌ Error message:', err.message);
    
    if (err.code === 'PROTOCOL_CONNECTION_LOST' || 
        err.code === 'ECONNRESET' || 
        err.code === 4031) {
      console.log('🔄 Connection lost, pool will handle reconnection automatically...');
      // Don't recreate connection - pool handles this
    } else {
      console.error('❌ Fatal database error:', err);
      // For fatal errors, recreate the pool
      setTimeout(createDbConnection, 5000);
    }
  });

  return db;
};

// Initialize database connection
createDbConnection();

// Updated middleware to check database connection
app.use('/api/contact', (req, res, next) => {
  if (!db) {
    return res.status(503).json({
      error: 'Database not available',
      message: 'Please try again later',
      timestamp: new Date().toISOString()
    });
  }
  
  // Test pool connection
  db.getConnection((err, connection) => {
    if (err) {
      return res.status(503).json({
        error: 'Database connection failed',
        message: 'Please try again later',
        timestamp: new Date().toISOString()
      });
    }
    connection.release();
    next();
  });
});

// Updated database health check endpoint
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
      connection_type: 'pool',
      query_result: results[0],
      timestamp: new Date().toISOString()
    });
  });
});

// Admin endpoint to check contacts (for testing)
app.get('/admin/contacts', (req, res) => {
  if (!db) {
    return res.status(500).json({ error: 'Database not available' });
  }

  db.query('SELECT * FROM contacts ORDER BY created_at DESC LIMIT 10', (err, results) => {
    if (err) {
      console.error('❌ Error fetching contacts:', err);
      return res.status(500).json({ 
        error: 'Database query failed', 
        details: err.message 
      });
    }
    
    res.json({
      success: true,
      count: results.length,
      contacts: results
    });
  });
});

// Admin endpoint to check database structure
app.get('/admin/db-info', (req, res) => {
  if (!db) {
    return res.status(500).json({ error: 'Database not available' });
  }

  db.query('SHOW TABLES', (err, tables) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    db.query('DESCRIBE contacts', (err, structure) => {
      res.json({
        tables: tables,
        contactsStructure: err ? 'Table does not exist' : structure
      });
    });
  });
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

// Root route - handles GET requests to /
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio Backend API',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
      admin: {
        contacts: '/admin/contacts',
        dbInfo: '/admin/db-info'
      }
    },
    timestamp: new Date().toISOString()
  });
});

// Status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method,
    availableRoutes: [
      'GET /',
      'GET /api/status',
      'GET /api/health',
      'GET /admin/contacts',
      'GET /admin/db-info',
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
  
  const config = getDbConfig();
  console.log(`📊 Database: ${config.database || 'Not configured'}`);
  console.log('✅ Server started successfully');
  
  // Log environment variables for debugging (without sensitive data)
  console.log('🔧 Database Configuration:');
  console.log(`   Host: ${config.host}`);
  console.log(`   Port: ${config.port}`);
  console.log(`   User: ${config.user}`);
  console.log(`   Database: ${config.database}`);
  console.log(`   Password: ${config.password ? '[SET]' : '[NOT SET]'}`);
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