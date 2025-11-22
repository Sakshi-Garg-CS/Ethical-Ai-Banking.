# How to Run FairBank AI Services

## ✅ Services Status

All services are now running and tested!

## 🚀 Quick Start Commands

### Terminal 1: AI Service (Python/Flask)
```bash
cd ai-service
python app.py
```
**Status:** ✅ Running on http://localhost:5001

### Terminal 2: Backend (Node.js/Express)
```bash
cd backend
npm run dev
```
**Status:** ✅ Running on http://localhost:5000

### Terminal 3: Frontend (React)
```bash
cd frontend
npm run dev
```
**Status:** ✅ Running on http://localhost:3000

## 🧪 Test Results

### AI Service Health Check
```json
{
  "status": "OK",
  "message": "AI Service is running"
}
```

### AI Service Prediction Test
**Input:**
- Income: ₹500,000
- Credit Score: 750
- Loan Amount: ₹500,000
- Employment: Salaried
- Existing Debt: ₹50,000

**Output:**
```json
{
  "probability": 100,
  "shapExplanations": {
    "Credit Score": 20,
    "Income": 20,
    "Employment Type": 3,
    "Existing Debt": -2.5,
    "Loan Amount": -2.5
  },
  "fairnessCheck": {
    "passed": true,
    "demographicParity": 0.95,
    "equalizedOdds": 0.08
  }
}
```

### Backend Health Check
```json
{
  "status": "OK",
  "message": "FairBank AI Backend is running"
}
```

## 📱 Access Points

- **Frontend UI:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **AI Service:** http://localhost:5001

## 🔗 API Endpoints

### Backend
- `GET /health` - Health check
- `POST /api/loan/predict` - Submit loan application
- `GET /api/loan/history` - Get application history

### AI Service
- `GET /health` - Health check
- `POST /predict` - Get loan prediction with SHAP explanations

## 📝 Example API Call

```bash
curl -X POST http://localhost:5000/api/loan/predict \
  -H "Content-Type: application/json" \
  -d '{
    "income": 500000,
    "creditScore": 750,
    "loanAmount": 500000,
    "employmentType": "salaried",
    "existingDebt": 50000,
    "age": 30,
    "gender": "female",
    "region": "tier2"
  }'
```

## ⚠️ Notes

- MongoDB connection is optional for basic testing (services work without it)
- For full functionality, install and run MongoDB or use MongoDB Atlas
- SHAP and AIF360 are optional - services work with simplified calculations
- All services support CORS and can communicate with each other

