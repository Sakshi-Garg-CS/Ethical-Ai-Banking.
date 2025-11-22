const express = require('express');
const router = express.Router();
const axios = require('axios');
const LoanApplication = require('../models/LoanApplication');

// AI Service URL
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5001';

// Submit loan application
router.post('/predict', async (req, res) => {
  try {
    const applicationData = req.body;

    // Call AI microservice
    const aiResponse = await axios.post(`${AI_SERVICE_URL}/predict`, applicationData);

    // Save application to database (if MongoDB is connected)
    try {
      const loanApplication = new LoanApplication({
        ...applicationData,
        prediction: aiResponse.data.probability,
        shapExplanations: aiResponse.data.shapExplanations,
        fairnessCheck: aiResponse.data.fairnessCheck,
        timestamp: new Date()
      });
      await loanApplication.save();
    } catch (dbError) {
      // Continue even if database save fails (MongoDB not required for testing)
      console.log('Note: Application not saved to database (MongoDB not connected)');
    }

    res.json({
      success: true,
      probability: aiResponse.data.probability,
      shapExplanations: aiResponse.data.shapExplanations,
      fairnessCheck: aiResponse.data.fairnessCheck,
      recommendations: aiResponse.data.recommendations
    });
  } catch (error) {
    console.error('Error processing loan application:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing application',
      error: error.message 
    });
  }
});

// Get application history
router.get('/history', async (req, res) => {
  try {
    const applications = await LoanApplication.find().sort({ timestamp: -1 }).limit(10);
    res.json({ success: true, applications });
  } catch (error) {
    // Return empty array if MongoDB not connected
    res.json({ success: true, applications: [], message: 'Database not available' });
  }
});

module.exports = router;

