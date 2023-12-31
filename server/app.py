from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import joblib
import time

app = Flask(__name__)
CORS(app)

# Load the trained model and vectorizer
classifier = joblib.load('phishing_model.joblib')
vectorizer = joblib.load('url_vectorizer.joblib')

# Load the LabelEncoder if available, otherwise create a new one and fit it
try:
    le = joblib.load('label_encoder.joblib')
except FileNotFoundError:
    le = LabelEncoder()
    le.fit(['legitimate', 'phishing'])  # You may need to adjust the class labels based on your dataset

# Define the predict function
def predict_url(url):
    try:
        if "https" in url:
            return "legitimate"

        url_vec = vectorizer.transform([url])
        prediction = classifier.predict(url_vec)
        prediction_label = le.inverse_transform(prediction)[0]
        return prediction_label
    except Exception as e:
        # Log the exception if needed
        print(f"Error during prediction: {e}")
        return "not legitimate"

# API endpoint for prediction using GET or POST request
@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == 'GET':
        input_url = request.args.get('url', '')
        print(input_url)

    elif request.method == 'POST':
        data = request.get_json(force=True)
        input_url = data.get('url', '')
        print(input_url)
    else:
        return jsonify({'error': 'Invalid HTTP method'})

    result = predict_url(input_url)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(port=5001, debug=True)
