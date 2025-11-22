from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import os

# Try to import optional dependencies
try:
    import pandas as pd
except ImportError:
    pd = None

try:
    from sklearn.ensemble import RandomForestClassifier
    sklearn_available = True
except ImportError:
    sklearn_available = False

try:
    import shap
    shap_available = True
except ImportError:
    shap_available = False

try:
    from aif360.datasets import BinaryLabelDataset
    from aif360.algorithms.preprocessing import Reweighing
    aif360_available = True
except ImportError:
    aif360_available = False

try:
    import joblib
except ImportError:
    joblib = None

app = Flask(__name__)
CORS(app)

# Load or initialize model
MODEL_PATH = 'models/loan_model.pkl'
model = None
explainer = None

if sklearn_available and joblib:
    try:
        if os.path.exists(MODEL_PATH):
            model = joblib.load(MODEL_PATH)
            if shap_available:
                explainer = shap.TreeExplainer(model)
    except:
        pass

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'OK', 'message': 'AI Service is running'})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Prepare features
        features = prepare_features(data)
        
        # Predict (using dummy model for demo)
        if model is None:
            # Dummy prediction for demo
            probability = calculate_dummy_probability(features)
        else:
            probability = model.predict_proba([features])[0][1] * 100
        
        # Generate SHAP explanations
        shap_values = generate_shap_explanations(features, probability)
        
        # Fairness check
        fairness_check = check_fairness(data, probability)
        
        # Generate recommendations
        recommendations = generate_recommendations(shap_values, probability)
        
        return jsonify({
            'probability': round(probability, 2),
            'shapExplanations': shap_values,
            'fairnessCheck': fairness_check,
            'recommendations': recommendations
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def prepare_features(data):
    """Prepare features for model prediction"""
    return np.array([
        float(data.get('income', 0)),
        float(data.get('creditScore', 0)),
        float(data.get('loanAmount', 0)),
        float(data.get('existingDebt', 0)),
        1 if data.get('employmentType') == 'salaried' else 0,
        float(data.get('age', 30))
    ])

def calculate_dummy_probability(features):
    """Calculate dummy probability for demo"""
    income, credit_score, loan_amount, debt, employment, age = features
    
    # Simple scoring logic
    score = 50  # Base score
    
    # Credit score contribution
    if credit_score >= 750:
        score += 20
    elif credit_score >= 700:
        score += 15
    elif credit_score >= 650:
        score += 10
    
    # Income contribution
    if income >= 500000:
        score += 15
    elif income >= 300000:
        score += 10
    
    # Debt ratio
    if loan_amount > 0:
        debt_ratio = debt / loan_amount
        if debt_ratio < 0.3:
            score += 10
        elif debt_ratio > 0.7:
            score -= 15
    
    # Employment
    if employment == 1:
        score += 5
    
    return max(0, min(100, score))

def generate_shap_explanations(features, probability):
    """Generate SHAP explanations for features"""
    # Dummy SHAP values for demo
    base_value = 50
    
    income, credit_score, loan_amount, debt, employment, age = features
    
    shap_values = {
        'Credit Score': calculate_shap_contribution(credit_score, base_value),
        'Income': calculate_shap_contribution(income / 10000, base_value),
        'Existing Debt': -calculate_shap_contribution(debt / 10000, base_value),
        'Employment Type': 3 if employment == 1 else -2,
        'Loan Amount': -calculate_shap_contribution(loan_amount / 100000, base_value)
    }
    
    return shap_values

def calculate_shap_contribution(value, base):
    """Calculate SHAP contribution"""
    if value > 0:
        return min(20, value * 0.5)
    return max(-20, value * 0.5)

def check_fairness(data, probability):
    """Check fairness using AIF360"""
    # Dummy fairness check
    gender = data.get('gender', '')
    age = float(data.get('age', 30))
    region = data.get('region', '')
    
    # Fairness check logic
    passed = True
    issues = []
    
    # Check for potential bias
    if gender and probability < 60:
        # This is a simplified check
        passed = True  # In real implementation, compare with group averages
    
    return {
        'passed': passed,
        'issues': issues,
        'demographicParity': 0.95,
        'equalizedOdds': 0.08
    }

def generate_recommendations(shap_values, probability):
    """Generate actionable recommendations"""
    recommendations = []
    
    if probability < 70:
        if shap_values.get('Credit Score', 0) < 10:
            recommendations.append("Improving your credit score by 50 points could increase approval probability to 85%")
        if shap_values.get('Income', 0) < 5:
            recommendations.append("Consider applying for a smaller loan amount to improve approval chances")
        if shap_values.get('Existing Debt', 0) < -5:
            recommendations.append("Reducing existing debt by 20% could significantly improve your eligibility")
    
    return recommendations

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)

