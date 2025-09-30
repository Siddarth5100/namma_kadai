from db import db

class Company(db.Model):
    __tablename__ = "company"
    company_name = db.Column(db.String(255),primary_key = True)
    cash_balance = db.Column(db.Integer)

class Item(db.Model):
    __tablename__ = "item"
    item_id = db.Column(db.Integer,primary_key = True,autoincrement = True)
    item_name = db.Column(db.String(255))

class Purchase(db.Model):
    __tablename__ = "purchase"
    purchase_id = db.Column(db.Integer,primary_key = True,autoincrement = True)
    timestamp = db.Column(db.DateTime)
    item_id = db.Column(db.Integer)
    qty = db.Column(db.Integer)
    rate = db.Column(db.Integer)
    amount = db.Column(db.Integer)

class Sales(db.Model):
    __tablename__ = "sales"
    sales_id = db.Column(db.Integer,primary_key = True,autoincrement = True)
    timestamp = db.Column(db.DateTime)
    item_id = db.Column(db.Integer)
    qty = db.Column(db.Integer)
    rate = db.Column(db.Integer)
    amount = db.Column(db.Integer)


def create_tables():
    db.create_all()
    print("All tables created successfully")