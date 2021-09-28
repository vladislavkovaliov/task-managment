from time import sleep

from flask_restful import Resource, reqparse
from threading import Thread
from flask_sse import sse


from index import app, db
from models.process import process_schema, Process, processes_schema
from parsers.process import process_parsers

parser = process_parsers(reqparse)


class ProcessesResource(Resource):
    def get(self, job_id):
        processes = Process.query.filter_by(
            job_id=job_id
        ).all()

        return processes_schema.dump(processes), 200

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
        sse.publish(process_schema.dump(process), type="create_process")

        return process_schema.dump(process), 201


class ProcessResource(Resource):
    def put(self, job_id, process_id):
        print(job_id, process_id)
        f_process = Process.query.filter_by(
            job_id=job_id,
            id=process_id
        ).first()

        if f_process is None:
            return 404

        args = parser.parse_args()

        f_process.duration = args["duration"]
        f_process.status = args["status"]

        db.session.commit(), 200

        sse.publish(process_schema.dump(f_process), type="update_process")

        return process_schema.dump(f_process),

    def delete(self, job_id, process_id):
        f_process = Process.query.filter_by(
            job_id=job_id,
            id=process_id
        ).first()

        if f_process is None:
            return 404

        db.session.delete(f_process)
        db.session.commit()

        sse.publish(process_schema.dump(f_process), type="delete_process")

        return process_schema.dump(f_process), 200
