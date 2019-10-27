# app.py
from flask import Flask
from flask import render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///schools.sqlite3'
db = SQLAlchemy(app)
@app.route("/")
def index():  
    return render_template("/umbrella.html")

if __name__ == '__main__':
    app.run(debug=True)