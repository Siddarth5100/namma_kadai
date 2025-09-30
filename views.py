from db import db
from models import Company, Item, Purchase, Sales
from datetime import datetime
from flask import request, jsonify, render_template, Blueprint


now = datetime.now()
api = Blueprint('api', __name__)


@api.route('/home', methods=['GET'])
def get_company():
    row = Company.query.filter_by(company_name='namma kadai').first()
    return render_template('index.html', name=row.company_name, balance=row.cash_balance)


def add_items(id, name):
    item = Item(item_id=id, item_name=name)
    #print(item)

    db.session.add(item)
    db.session.commit()

    return {"message":"Item added successfully"}


@api.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    for item in items:
        print("item row", dir(item))
        print("Query",item.query) 
    
    print("----------------------------------",dir(items))
    result = [{"id": i.item_id, "name": i.item_name} for i in items]
    
    #return jsonify(result)
    return render_template('index.html', items=result)


@api.route('/items', methods=['POST'])
def create_items():
    data = request.json
    new_id = data['id']
    new_name = data['name']
    item = Item(item_id=new_id, item_name=new_name)    
    db.session.add(item)
    db.session.commit()
    return jsonify({"message" : "item added successfully"})



def purchase_items(time, item_id, qty, rate, amount):
    purchase = Purchase(timestamp = time, item_id = item_id, qty = qty, rate = rate, amount = amount)

    db.session.add(purchase)
    db.session.commit()

# re-factor 
@api.route('/purchase', methods=['POST'])
def post_purchase_items():
    data = request.json
    time = datetime.now()
    item_id = data["item_id"]
    qty = data["qty"]
    rate = data["rate"]
    amount = qty * rate

    company = Company.query.first()

    if company.cash_balance < amount:
        return jsonify({
            "message" : "Insufficient balance to make this purchase"
        }), 400

    
    new_purchase = Purchase(timestamp = time, item_id = item_id, qty = qty, rate = rate, amount = amount)
    db.session.add(new_purchase)

    
    company.cash_balance = company.cash_balance - amount
    
    db.session.commit()

    return jsonify({
        "message" : "purchase added successfully",
        "amount": amount,
        "updated_balance" : company.cash_balance
    })



def sales_items(time, item_id, qty, rate, amount):
    sales = Sales(timestamp=time, item_id=item_id, qty=qty, rate=rate, amount=amount)

@api.route('/sales', methods=['POST'])
def post_sales_items():
    data = request.json
    time = datetime.now()
    item_id = data["item_id"]
    qty = data["qty"]
    rate = data["rate"]
    amount = qty * rate

    new_sales = Sales(timestamp=time, item_id=item_id, qty=qty, rate=rate, amount=amount)
    db.session.add(new_sales)

    company = Company.query.first()
    company.cash_balance = company.cash_balance + amount

    db.session.commit()

    return jsonify({
        "message" : "sales added successfully",
        "amount" : amount,
        "updated_balance" : company.cash_balance
    })


@api.route('/dashboard')
def dashboard():
    company = Company.query.first()

    items = Item.query.all()
    result = [{"id":i.item_id, "name": i.item_name} for i in items]
    



#     @api.route('/home_full')
# def home_full():
#     # Fetch company info
#     company = Company.query.first()
    
#     # Fetch all items
#     items = Item.query.all()
#     item_list = [{"id": i.item_id, "name": i.item_name} for i in items]
    
#     # Pass everything to the template
#     return render_template(
#         'home_full.html',
#         name=company.name,
#         balance=company.cash_balance,
#         items=item_list
#     )
