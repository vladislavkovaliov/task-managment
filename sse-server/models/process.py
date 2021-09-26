from index import db, ma


class Process(db.Model):
    __tablename__ = 'processes'

    id = db.Column(db.Integer, primary_key=True)
    app = db.Column(db.String(80), unique=False, nullable=False)
    api_type = db.Column(db.String(80), unique=False, nullable=False)
    duration = db.Column(db.Integer, unique=False, nullable=False)
    status = db.Column(db.String(80), unique=False, nullable=False)
    started_at = db.Column(db.String(80), unique=False, nullable=False)
    username = db.Column(db.String(80), unique=False, nullable=False)
    version = db.Column(db.String(80), unique=False, nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'))

    def __init__(self, app, api_type, duration, status, started_at, username, version, job_id):
        self.app = app
        self.api_type = api_type
        self.duration = duration
        self.status = status
        self.started_at = started_at
        self.status = status
        self.username = username
        self.version = version
        self.job_id = job_id

    def __repr__(self):
        return '<Process %r>' % self.app


class ProcessSchema(ma.Schema):
    class Meta:
        fields = ("id", "app", "api_type", "duration", "status", "started_at", "username", "version", "job_id")


process_schema = ProcessSchema()
processes_schema = ProcessSchema(many=True)
