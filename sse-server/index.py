from threading import Thread

from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'some-secret-string'

api = Api(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)


def start():
    import routes
    routes.init_routes(app, api)
    app.run(debug=True)


if __name__ == "__main__":
    server = Thread(target=start())
    server.start()
