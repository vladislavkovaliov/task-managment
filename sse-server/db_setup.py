from index import app, db

from models.job import Job
from models.process import Process


with app.app_context():
    db.create_all()
