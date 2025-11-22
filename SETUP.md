# FairBank AI - Setup Guide

## Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.9 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**

## Step-by-Step Setup

### 1. Clone Repository
```bash
git clone <your-repository-url>
cd fairbank-ai
```

### 2. MongoDB Setup
- Install MongoDB locally OR
- Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
- Get your connection string

### 3. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

### 4. AI Service Setup
```bash
cd ai-service
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
# Edit .env with your MongoDB URI
python app.py
```

### 5. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fairbank-ai
AI_SERVICE_URL=http://localhost:5001
JWT_SECRET=your-secret-key-here
```

### AI Service (.env)
```
PORT=5001
MONGODB_URI=mongodb://localhost:27017/fairbank-ai
```

## Running the Application

1. Start MongoDB (if local)
2. Start Backend: `cd backend && npm run dev`
3. Start AI Service: `cd ai-service && python app.py`
4. Start Frontend: `cd frontend && npm run dev`

## Access Points

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- AI Service: http://localhost:5001

## Troubleshooting

- **Port already in use:** Change PORT in .env files
- **MongoDB connection error:** Check MongoDB URI in .env
- **Module not found:** Run `npm install` or `pip install -r requirements.txt`
- **CORS errors:** Ensure backend and AI service CORS are enabled

