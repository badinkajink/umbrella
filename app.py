# app.py
from flask import Flask
from flask import render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///schools.sqlite3'
db = SQLAlchemy(app)

db.Model.metadata.reflect(db.engine)

class School(db.Model):
    __tablename__ = 'schools'
    __table_args__ = {'extend_existing': True}
    LOC_CODE = db.Column(db.Text, primary_key=True)

#print("Total number of schools is", School.query.count())

@app.route("/")
def index():  
    return render_template("umbrella.html")

@app.route("/schools/<slug>")
def detail(slug):
    school = School.query.filter_by(LOC_CODE=slug).first()
    return render_template("detail.html", school=school)

@app.route("/count")
def shoelaces():
    return "This works now!"

@app.route("/list")
def about():
    school_count = School.query.count()
    
    """ school = School.query.filter_by(LOC_CODE='X270').first()
    print("School's name", school.SCHOOLNAME) """

    schools = School.query.all()

    return render_template("list.html", count=school_count, schools=schools, location="New York City")

@app.route('/city/<cityname>')
def city(cityname):
    cityname = cityname.replace("-"," ")
    schools = School.query.filter_by(city=cityname.upper()).all()
    return render_template("list.html", count=len(schools), schools=schools, location=cityname)

@app.route('/zip/<zipcode>')
def zip(zipcode):
    schools = School.query.filter_by(ZIP=zipcode).all()
    return render_template("list.html", count=len(schools), schools=schools, location=zipcode)

@app.route('/city')
def city_list():
    # Get the unique city values from the database
    cities = School.query.with_entities(School.city).distinct().all()
    # ...more notes I'm hiding...
    # Convert to titlecase while we're pulling out of the weird list thing
    cities = [city[0].title() for city in cities]
    # Now that they're both "New York," we can now dedupe and sort
    cities = sorted(list(set(cities)))
    return render_template("cities.html", cities=cities)

@app.route('/zipcode')
def zip_list():
    # Get the unique city values from the database
    zipcodes = School.query.with_entities(School.ZIP).distinct().all()
    # ...more notes I'm hiding...
    # Convert to titlecase while we're pulling out of the weird list thing
    # Now that they're both "New York," we can now dedupe and sort
    zipcodes = [zipcode[0] for zipcode in zipcodes]
    zipcodes = sorted(list(set(zipcodes)))
    return render_template("zipcodes.html", zipcodes = zipcodes)

if __name__ == '__main__':
    app.run(debug=True)