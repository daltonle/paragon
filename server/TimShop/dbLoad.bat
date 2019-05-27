cd script
py dbDelete.py

cd ../
py manage.py loaddata fixtures\locations.json
py manage.py loaddata fixtures\account.json
py manage.py loaddata fixtures\customers.json
py manage.py loaddata fixtures\productModel.json
py manage.py loaddata fixtures\sale.json