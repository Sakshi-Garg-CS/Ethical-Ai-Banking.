import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

function LoanApplication() {
  const [formData, setFormData] = useState({
    income: '',
    creditScore: '',
    loanAmount: '',
    employmentType: '',
    existingDebt: '',
    age: '',
    gender: '',
    region: ''
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/loan/predict', formData)
      setResult(response.data)
    } catch (error) {
      console.error('Error:', error)
      alert('Error submitting application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Loan Application</h2>
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Income (₹)</label>
            <input
              type="number"
              value={formData.income}
              onChange={(e) => setFormData({...formData, income: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Credit Score</label>
            <input
              type="number"
              value={formData.creditScore}
              onChange={(e) => setFormData({...formData, creditScore: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Loan Amount (₹)</label>
            <input
              type="number"
              value={formData.loanAmount}
              onChange={(e) => setFormData({...formData, loanAmount: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Employment Type</label>
            <select
              value={formData.employmentType}
              onChange={(e) => setFormData({...formData, employmentType: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            >
              <option value="">Select</option>
              <option value="salaried">Salaried</option>
              <option value="self-employed">Self-Employed</option>
              <option value="business">Business</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Existing Debt (₹)</label>
            <input
              type="number"
              value={formData.existingDebt}
              onChange={(e) => setFormData({...formData, existingDebt: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Processing...' : 'Submit Application'}
        </button>
      </form>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-2xl font-bold mb-4">Decision Result</h3>
          <div className="space-y-4">
            <div>
              <p className="text-lg font-semibold">Approval Probability: {result.probability}%</p>
            </div>
            {result.shapExplanations && (
              <div>
                <h4 className="font-semibold mb-2">SHAP Explanations:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {Object.entries(result.shapExplanations).map(([feature, value]) => (
                    <li key={feature}>{feature}: {value > 0 ? '+' : ''}{value}%</li>
                  ))}
                </ul>
              </div>
            )}
            {result.fairnessCheck && (
              <div>
                <h4 className="font-semibold mb-2">Fairness Check:</h4>
                <p className={result.fairnessCheck.passed ? 'text-green-600' : 'text-red-600'}>
                  {result.fairnessCheck.passed ? '✓ No bias detected' : '⚠ Bias detected'}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default LoanApplication

