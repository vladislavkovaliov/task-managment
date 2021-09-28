from flask_restful import Resource, reqparse
from flask_sse import sse

from index import db, app
from models.job import Job, job_schema, jobs_schema
from models.process import Process
from parsers.job import job_parsers

parser = job_parsers(reqparse)


class JobsResource(Resource):
    def get(self):
        jobs = Job.query.all()
        processes = Process.query.all()
        newJobs = {}
        for process in processes:
            if process.job_id in newJobs:
                newJobs[process.job_id].append(process)
            else:
                newJobs[process.job_id] = [process]

        return jobs_schema.dump(jobs), 200

    def post(self):
        args = parser.parse_args()
        founded_job = Job.query.filter_by(
            app=args["app"]
        ).first()

        if founded_job is not None:
            return job_schema.dump(founded_job), 302

        job = Job(
            app=args["app"],
            api_type=args["api_type"],
            duration=args["duration"],
            status=args["status"],
            started_at=args["started_at"],
            username=args["username"],
            version=args["version"]
        )

        db.session.add(job)
        db.session.commit()

        sse.publish(job_schema.dump(job), type="create_job")

        return job_schema.dump(job), 201


class JobResource(Resource):
    def put(self, job_id):
        f_job = Job.query.filter_by(
            id=job_id
        ).first()

        if f_job is None:
            return 404

        return job_schema.dump(f_job), 200

    def delete(self, job_id):
        f_job = Job.query.filter_by(
            id=job_id
        ).first()

        if f_job is None:
            return 404

        db.session.delete(f_job)
        db.session.commit()

        sse.publish(job_schema.dump(f_job), type="delete_job")

        return job_schema.dump(f_job), 200