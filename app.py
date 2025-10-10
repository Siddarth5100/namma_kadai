from flask import Flask
from db import db
from models import create_tables, Company
from views import api
from flask_migrate import Migrate

app = Flask(__name__) # creating copy of Flask

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:Sid5100#!1@localhost/namma_kadai'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app) # binds db(obj) to flask app
migrate = Migrate(app,db)


def create_company():
    company_name = "Namma kadai"
    initial_cash_balance = 1000
    company = Company(company_name=company_name,cash_balance=initial_cash_balance)

    db.session.add(company)
    db.session.commit()


app.register_blueprint(api)

if __name__ == "__main__":
    with app.app_context():
        create_tables()

    app.run(debug=True)