from index import db, ma


class Job(db.Model):
    __tablename__ = 'jobs'

    id = db.Column(db.Integer, primary_key=True)
    app = db.Column(db.String(80), unique=False, nullable=False)
    api_type = db.Column(db.String(80), unique=False, nullable=False)
    duration = db.Column(db.Integer, unique=False, nullable=False)
    status = db.Column(db.String(80), unique=False, nullable=False)
    started_at = db.Column(db.String(80), unique=False, nullable=False)
    username = db.Column(db.String(80), unique=False, nullable=False)
    version = db.Column(db.String(80), unique=False, nullable=False)
    processes = db.relationship('Process', backref='job', lazy='dynamic')

    def __init__(self, app, api_type, duration, status, started_at, username, version):
        self.app = app
        self.api_type = api_type
        self.duration = duration
        self.status = status
        self.started_at = started_at
        self.status = status
        self.username = username
        self.version = version

    def __repr__(self):
        return '<Job %r>' % self.app


class JobSchema(ma.Schema):
    class Meta:
        fields = ("id", "app", "api_type", "duration", "status", "started_at", "username", "version")


job_schema = JobSchema()
jobs_schema = JobSchema(many=True)
