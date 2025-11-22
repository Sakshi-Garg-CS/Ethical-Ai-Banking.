import { useState } from 'react'
import { motion } from 'framer-motion'
import LoanApplication from './components/LoanApplication'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('application')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">FairBank AI</h1>
              <span className="ml-4 text-sm text-gray-600">Ethical & Transparent Loan Decisions</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('application')}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Apply for Loan
              </button>
              <button
                onClick={() => setCurrentView('dashboard')}
                className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {currentView === 'application' ? <LoanApplication /> : <Dashboard />}
        </motion.div>
      </main>
    </div>
  )
}

export default App

