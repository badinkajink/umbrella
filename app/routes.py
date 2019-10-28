from app import app
from flask import Flask
from flask import render_template
from flask_sqlalchemy import SQLAlchemy

@app.route("/")
def home():  
    return render_template("umbrella.html")

@app.route('/index')
def index():
    user = {'username': 'Miguel'}
    posts = [
        {
            'author': {'username': 'John'},
            'body': 'Beautiful day in Portland!'
        },
        {
            'author': {'username': 'Susan'},
            'body': 'The Avengers movie was so cool!'
        }
    ]
    return render_template('index.html', title='Home', user=user, posts=posts)
