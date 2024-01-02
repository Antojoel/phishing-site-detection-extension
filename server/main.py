import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
from sklearn.preprocessing import LabelEncoder
import joblib
import time
start_time = time.time()

# Load the dataset
df = pd.read_csv('dataset.csv')

# Extract features (URLs) and labels
X = df['url']
y = df['status']

# Encode labels to numerical values
le = LabelEncoder()
y = le.fit_transform(y)

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Convert URLs to numerical features using TfidfVectorizer
vectorizer = TfidfVectorizer()
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Train a Random Forest classifier
classifier = RandomForestClassifier(n_estimators=100, random_state=42)
classifier.fit(X_train_vec, y_train)

# Save the trained model and vectorizer
joblib.dump(classifier, 'phishing_model.joblib')
joblib.dump(vectorizer, 'url_vectorizer.joblib')

# Load the trained model and vectorizer
classifier = joblib.load('phishing_model.joblib')
vectorizer = joblib.load('url_vectorizer.joblib')

# Function to predict if a URL is phishing or legitimate
def predict_url(url):
    # Check if "https" is present in the URL (indicating legitimacy)
    if "https" in url:
        return "legitimate"

    # Vectorize the input URL
    url_vec = vectorizer.transform([url])

    # Make a prediction
    prediction = classifier.predict(url_vec)

    # Decode the prediction label
    prediction_label = le.inverse_transform(prediction)[0]

    return prediction_label

# Example usage
input_url = "http://apple.com"
result = predict_url(input_url)
print(f"The URL '{input_url}' is predicted to be {result}.")
print("--- %s seconds ---" % (time.time() - start_time))

