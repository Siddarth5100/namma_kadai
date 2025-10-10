from db import db

class Company(db.Model):
    __tablename__ = "company"
    company_name = db.Column(db.String(255),primary_key = True)
    cash_balance = db.Column(db.Integer)

class Item(db.Model):
    __tablename__ = "item"
    item_id = db.Column(db.Integer,primary_key = True,autoincrement = True)
    item_name = db.Column(db.String(100), unique=True, nullable=False)
    # qty = db.column(db.Integer, default=0, nullable=False)
  
class Purchase(db.Model):
    __tablename__ = "purchase"
    purchase_id = db.Column(db.Integer,primary_key = True,autoincrement = True)
    timestamp = db.Column(db.DateTime, nullable=False)
    item_id = db.Column(db.Integer, db.ForeignKey('item.item_id'), nullable=False, index=True)
    qty = db.Column(db.Integer, nullable=False)
    rate = db.Column(db.Integer, nullable=False)
    amount = db.Column(db.Integer)

class Sales(db.Model):
    __tablename__ = "sales"
    sales_id = db.Column(db.Integer,primary_key = True,autoincrement = True)
    timestamp = db.Column(db.DateTime)
    item_id = db.Column(db.Integer, db.ForeignKey('item.item_id'), nullable=False, index=True)
    qty = db.Column(db.Integer, nullable=False)
    rate = db.Column(db.Integer, nullable=False)
    amount = db.Column(db.Integer)


def create_tables():
    db.create_all()
    print("All tables created successfully")