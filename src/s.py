from flask import Flask, jsonify, request
import pandas as pd
from pycaret.regression import *
import pickle
from datetime import datetime


# prediction function 
def generate_predictions(start_date, end_date, final_model):
    # Generate a date range from start_date to end_date
    date_range = pd.date_range(start=start_date, end=end_date, freq='D')

    # Create a DataFrame with the date range
    predictions_df = pd.DataFrame({
        'COLLECTION_DATE': date_range
    })

    # Fill in the additional columns based on the COLLECTION_DATE
    predictions_df['month'] = predictions_df['COLLECTION_DATE'].dt.month
    predictions_df['year'] = predictions_df['COLLECTION_DATE'].dt.year
    predictions_df['day_of_week'] = predictions_df['COLLECTION_DATE'].dt.dayofweek
    predictions_df['day_of_year'] = predictions_df['COLLECTION_DATE'].dt.dayofyear

    # Make predictions using the trained model
    predictions = predict_model(final_model, data=predictions_df)
    predictions = predictions.iloc[:-2]

    return predictions



app = Flask(__name__)

# Load and preprocess the data
data = pd.read_csv('f-data-w-i-2.csv')
data['COLLECTION_DATE'] = pd.to_datetime(data['COLLECTION_DATE'], format='%Y-%m-%d')
# Drop unnecessary columns and rows with missing values
data.dropna(inplace=True)
data.drop(['Unnamed: 0',"Observation Value","BIP_BP6_USD","BXIP_BP6_USD","PCPI_CP_08_IX",'NTN_COUNT', 'NTN_UNIQUE', 'FPE_IX', 'petrol_price'], axis=1, inplace=True)

# Create additional date features
data['month'] = data['COLLECTION_DATE'].dt.month
data['year'] = data['COLLECTION_DATE'].dt.year
data['day_of_week'] = data['COLLECTION_DATE'].dt.dayofweek
data['day_of_year'] = data['COLLECTION_DATE'].dt.dayofyear


print(data['year'])
# Split the data into train and test sets
train = data[data['year'] < 2022]
test = data[data['year'] >= 2022]

# Check if train and test sets are not empty
if train.empty or test.empty:
    raise ValueError("Train or test data is empty. Please check the data preprocessing step.")

# Setup the model
reg_setup = setup(data=train, 
               test_data=test, target='GRAND_TOTAL_AMOUNT',
               fold_strategy='timeseries', 
               numeric_features=['year', 'month', 'day_of_week', 'day_of_year'],fold_shuffle=False,
                  data_split_shuffle=False,
                  session_id=42)

# Compare baseline regression models
best_model = compare_models()

# Tune the best model
tuned_model = tune_model(best_model)

# Finalize the model for deployment

final_model = finalize_model(tuned_model)

# Generate predictions on the test set
predictions = predict_model(final_model)

# Evaluate the model
evaluate_model(final_model)

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify(data.to_dict(orient='records'))

@app.route('/api/predictions', methods=['POST'])
def get_predictions():
    request_data = request.get_json()
    # print(request_data)
    
    # Adjust the date format according to the input
    start_date = pd.to_datetime(request_data['start_date'], format='%Y-%m-%d')
    end_date = pd.to_datetime(request_data['end_date'], format='%Y-%m-%d')
    # print(start_date, end_date)
    
    # Generate predictions
    date_range = pd.date_range(start=start_date, end=end_date, freq='D')
    predictions=generate_predictions(start_date, end_date, final_model)
    print("vvv________",predictions)
    return jsonify(predictions.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
