# Paragon - Database Information System

## Installation guide

### Set up a local server

#### Install Python 3.7 and pip

Pip is a package manager for Python packages and by default comes with Python version 3.4 or later.

Download and install Python from its [official website](https://www.python.org/downloads/).

If you already have Python installed without pip, you can follow the instruction [here](https://pip.pypa.io/en/stable/installing/) to install pip.

#### Install required packages

```bash
pip install djangorestframework
pip install django-cors-headers
pip install djangorestframework-jwt
pip install django-rest-auth
```

#### Migrate database and load initial dummy data

Run the script in `/server/TimShop/dbLoad.bat`.

#### Start the server

Change the working directory to `/server/TimShop/` and execute the following command

```
python manage.py runserver
```

The server will now run locally on port 8000.

### Start the client

#### Install Node.js and npm

Download and install the latest LTS version of Node.js from its [official website](https://nodejs.org/en/download/). npm will be automatically installed with Node.js.

#### Start the client

Change the working directory to `/client/` and execute the following commands

```
npm install
npm start
```

The client will start running locally and can be accessed with the browser via `localhost:3000`. The default login credentials of an admin is (username) **dalton** - (password) **dalton**.