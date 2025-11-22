const mongoose = require('mongoose');

const loanApplicationSchema = new mongoose.Schema({
  income: { type: Number, required: true },
  creditScore: { type: Number, required: true },
  loanAmount: { type: Number, required: true },
  employmentType: { type: String, required: true },
  existingDebt: { type: Number, required: true },
  age: { type: Number },
  gender: { type: String },
  region: { type: String },
  prediction: { type: Number },
  shapExplanations: { type: Object },
  fairnessCheck: { type: Object },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LoanApplication', loanApplicationSchema);

