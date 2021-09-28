from flask import Flask, render_template
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_sse import sse
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config["REDIS_URL"] = "redis://localhost"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'some-secret-string'
app.register_blueprint(sse, url_prefix='/stream')

api = Api(app)
db = SQLAlchemy(app)
ma = Marshmallow(app)


@app.route('/')
def index():
    return render_template("index.html")


if __name__ == "__main__":
    import routes
    routes.init_routes(app, api)

    app.run(debug=True)
