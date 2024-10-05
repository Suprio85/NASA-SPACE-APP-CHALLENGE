import os
import pandas as pd

def load_data():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    csv_file_path = os.path.join(script_dir, 'PlanaterySystem.csv')
    return pd.read_csv(csv_file_path)



def get_data():
    data = load_data()
    return data