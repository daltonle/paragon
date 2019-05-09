import os
import sys
import shutil
import errno
import stat
from pathlib import Path
import django

PWD = os.path.dirname(os.path.abspath(__file__))
print("PWD: " + PWD)
PROJECT_PATH = os.path.abspath(os.path.join(PWD, '../'))
sys.path.append(PROJECT_PATH)
print("PROJECT PATH: " + PROJECT_PATH)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'TimShop.settings')

try:
    django.setup()
except AttributeError:
    print(django.VERSION)

def handleRemoveReadonly(func, path, exc):
    excvalue = exc[1]
    if func in (os.rmdir, os.remove) and excvalue.errno == errno.EACCES:
        os.chmod(path, stat.S_IRWXU| stat.S_IRWXG| stat.S_IRWXO) # 0777
        func(path)
    else:
        raise

from django.core import management
db_path = Path(PROJECT_PATH) / 'db.sqlite3'
migrations_account = Path(PROJECT_PATH) / 'account' / 'migrations'
migrations_customers = Path(PROJECT_PATH) / 'customers' / 'migrations'
migrations_locations = Path(PROJECT_PATH) / 'locations' / 'migrations'
migrations_productModel = Path(PROJECT_PATH) / 'productModel' / 'migrations'
migrations_sale = Path(PROJECT_PATH) / 'sale' / 'migrations'

print("OS Platform: " + sys.platform)
if sys.platform == "win32":
    try:
        os.remove(db_path)
        shutil.rmtree(migrations_account, ignore_errors=False, onerror=handleRemoveReadonly)
        shutil.rmtree(migrations_customers, ignore_errors=False, onerror=handleRemoveReadonly)
        shutil.rmtree(migrations_locations, ignore_errors=False, onerror=handleRemoveReadonly)
        shutil.rmtree(migrations_productModel, ignore_errors=False, onerror=handleRemoveReadonly)
        shutil.rmtree(migrations_sale, ignore_errors=False, onerror=handleRemoveReadonly)
    except OSError as e:
        print("Error: %s - %s." % (e.filename, e.strerror))
elif sys.platform == "linux" or sys.platform == "darwin":
    try:
        os.remove(db_path.absolute())
        shutil.rmtree(migrations_account)
        shutil.rmtree(migrations_customers)
        shutil.rmtree(migrations_locations)
        shutil.rmtree(migrations_productModel)
        shutil.rmtree(migrations_sale)
    except OSError as e:
        print("Error: %s - %s." % (e.filename, e.strerror))

management.call_command('makemigrations', 'account', verbosity=1, interactive=False)
management.call_command('makemigrations', 'customers', verbosity=1, interactive=False)
management.call_command('makemigrations', 'locations', verbosity=1, interactive=False)
management.call_command('makemigrations', 'productModel', verbosity=1, interactive=False)
management.call_command('makemigrations', 'sale', verbosity=1, interactive=False)
management.call_command('migrate', verbosity=1, interactive=False)
