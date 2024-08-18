const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Retrieve the database connection string from environment variables
const DB = process.env.DATABASE_CONNECTION_STRING;

// Connect to MongoDB
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Database connection successful'))
  .catch((error) => console.error('Database connection error:', error.message));
