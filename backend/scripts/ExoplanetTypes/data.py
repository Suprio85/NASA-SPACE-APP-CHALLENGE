import os
import pandas as pd

def load_data():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    csv_file_path = os.path.join(script_dir, 'cleaned_5250.csv')
    return pd.read_csv(csv_file_path)



def get_data():
    data = load_data()
    return data



