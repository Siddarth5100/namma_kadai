from db import db
from models import Company, Item, Purchase, Sales
from datetime import datetime
from flask import request, jsonify, render_template, Blueprint


now = datetime.now()
api = Blueprint('api', __name__)



@api.route('/home', methods=['GET'])
def home_page():
    row = Company.query.filter_by(company_name='Namma kadai').first()
    items = Item.query.all()
    
    result = []

    for item in items:
        item_dict = {}
        item_dict["id"] = item.item_id
        item_dict["name"] = item.item_name
        result.append(item_dict)
    
        result.sort(key=lambda x: x["id"])
    return render_template('index.html', name=row.company_name, balance=row.cash_balance, items=result)


@api.route('/api/add_items', methods=['POST'])    
def add_items():
    data = request.get_json()
    print(data)
    item = data.get("item_name")
    print(item)

    #if not item:
    new_item = Item(item_name=item)

    db.session.add(new_item)
    db.session.commit()

    return jsonify({"message":"Item added successfully",
                    "item_id": new_item.item_id
    })


@api.route('/api/delete_items/<int:item_id>',methods=['DELETE'])
def delete_items(item_id):
    item = Item.query.get(item_id)
    if not item:
        return jsonify({"message": "Item not found"}), 404
    
    db.session.delete(item)
    db.session.commit()

    return jsonify({"message":"deleted succussfuly", "item_id":item_id})


@api.route('/purchase', methods=['GET'])
def get_purchase_page():
    purchases = Purchase.query.all() #fetch all purchase records
    return render_template('purchase.html', purchases=purchases)


@api.route('/api/add_new_purchase', methods=['POST'])
def post_purchase_items():
    data = request.get_json()
    time = datetime.now()
    item_id = data["item_id"]
    qty = int(data["qty"])
    rate = int(data["rate"])
    amount = qty * rate

    company = Company.query.first()

    if company.cash_balance < amount:
        #return render_template("purchase.html", message="Insufficient balance")
        return jsonify({
            "message" : "Insufficient balance to make this purchase"
        }), 400

    
    new_purchase = Purchase(timestamp = time, item_id = item_id, qty = qty, rate = rate, amount = amount)
    db.session.add(new_purchase)
    
    company.cash_balance = company.cash_balance - amount
    
    db.session.commit()

    #return render_template("purchase.html", message=f"Purchase successful, Amount: {amount}")
    return jsonify({
        "message" : "purchase added successfully",
        "amount": amount,
        "updated_balance" : company.cash_balance
    })


@api.route('/sales', methods=['GET'])
def get_sales_page():
    sales = Sales.query.all()
    return render_template('sales.html', sales=sales)


@api.route('/api/add_new_sales', methods=['POST'])
def post_sales_items():
    data = request.get_json()
    time = datetime.now()
    item_id = data["item_id"]
    qty = int(data["qty"])
    rate = int(data["rate"])
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































########*********************want to check

'''
def purchase_items(time, item_id, qty, rate, amount):
    purchase = Purchase(timestamp = time, item_id = item_id, qty = qty, rate = rate, amount = amount)

    db.session.add(purchase)
    db.session.commit()

 def sales_items(time, item_id, qty, rate, amount):
    sales = Sales(timestamp=time, item_id=item_id, qty=qty, rate=rate, amount=amount)
   

@api.route('/api/add_new_items', methods=['POST'])
def create_items():
    #data = request.form
    #new_id = data['id'] auto increment
    item_id = request.form.get("item_id")
    qty = int(request.form.get("qty"))
    rate = float(request.form.get("rate"))
    amount = qty * rate 

    company = company.query.first()

    existing_item = Item.query.filter_by(item_id=item_id).first()

    if existing_item:
        return jsonify({"message": "Item already exists"}),400    
    
    item = Item(item_id=item_id,qty=qty,rate=rate,amount=amount)  

    

    db.session.add(item)
    db.session.commit()
    return jsonify({"message" : "item added successfully", "item_id":item.item_id})
'''