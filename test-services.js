// Quick test script to verify services are running
const axios = require('axios');

async function testServices() {
  console.log('Testing FairBank AI Services...\n');

  // Test AI Service
  try {
    const aiResponse = await axios.get('http://localhost:5001/health');
    console.log('✅ AI Service:', aiResponse.data);
  } catch (error) {
    console.log('❌ AI Service not running:', error.message);
  }

  // Test Backend
  try {
    const backendResponse = await axios.get('http://localhost:5000/health');
    console.log('✅ Backend Service:', backendResponse.data);
  } catch (error) {
    console.log('❌ Backend not running:', error.message);
  }

  // Test Loan Prediction
  try {
    const testData = {
      income: 500000,
      creditScore: 750,
      loanAmount: 500000,
      employmentType: 'salaried',
      existingDebt: 50000,
      age: 30,
      gender: 'female',
      region: 'tier2'
    };
    const predictionResponse = await axios.post('http://localhost:5000/api/loan/predict', testData);
    console.log('\n✅ Loan Prediction Test:');
    console.log('   Probability:', predictionResponse.data.probability + '%');
    console.log('   SHAP Explanations:', predictionResponse.data.shapExplanations);
    console.log('   Fairness Check:', predictionResponse.data.fairnessCheck);
  } catch (error) {
    console.log('❌ Loan Prediction failed:', error.message);
  }
}

testServices();

