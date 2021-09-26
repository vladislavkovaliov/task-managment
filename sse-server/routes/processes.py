from time import sleep

from flask_restful import Resource, reqparse
from threading import Thread

from index import db
from models.process import process_schema, Process, processes_schema
from parsers.process import process_parsers

parser = process_parsers(reqparse)


class ProcessesResource(Resource):
    def get(self, job_id):
        processes = Process.query.filter_by(
            job_id=job_id
        ).all()

        return processes_schema.dump(processes)

    def post(self, job_id):
        args = parser.parse_args()
        founded_process = Process.query.filter_by(
            app=args["app"],
            job_id=int(job_id)
        ).first()

        if founded_process is not None:
            return process_schema.dump(founded_process), 302

        process = Process(
            app=args["app"],
            api_type=args["api_type"],
            duration=args["duration"],
            status=args["status"],
            started_at=args["started_at"],
            username=args["username"],
            version=args["version"],
            job_id=job_id
        )

        db.session.add(process)
        db.session.commit()

        th = Thread(target=update, args=[args["app"], int(job_id)])
        th.start()

        return process_schema.dump(process), 201


def update(process_app, job_id):
    founded_process = Process.query.filter_by(
        app=process_app,
        job_id=job_id
    ).first()

    for x in range(founded_process.duration):
        founded_process.duration = founded_process.duration - 1
        db.session.commit()
        sleep(1)

    db.session.delete(founded_process)
    db.session.commit()
