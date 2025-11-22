import { motion } from 'framer-motion'

function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-2">Fairness Metrics</h3>
          <p className="text-gray-600">Gender Gap: &lt;2%</p>
          <p className="text-gray-600">Regional Gap: &lt;3%</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-2">Model Performance</h3>
          <p className="text-gray-600">Accuracy: 86.3%</p>
          <p className="text-gray-600">Response Time: 142ms</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-2">Explainability</h3>
          <p className="text-gray-600">Coverage: 100%</p>
          <p className="text-gray-600">User Comprehension: 94%</p>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard

