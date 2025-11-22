const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection (Optional - works without MongoDB for testing)
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fairbank-ai';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => {
  console.warn('⚠️ MongoDB not connected - running without database (OK for testing)');
  console.warn('   Services will work but data won\'t be persisted');
});

// Routes
app.use('/api/loan', require('./routes/loanRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'FairBank AI Backend is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

