from time import sleep

from flask_restful import Resource, reqparse

from index import db
from models.job import Job, job_schema, jobs_schema
from parsers.job import job_parsers

parser = job_parsers(reqparse)


class JobsResource(Resource):
    def get(self):
        jobs = Job.query.all()

        return jobs_schema.dump(jobs)

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

        return job_schema.dump(job), 201


# def update(job_app):
#     founded_job = Job.query.filter_by(
#         app=job_app
#     ).first()
#
#     for x in range(founded_job.duration):
#         founded_job.duration = founded_job.duration - 1
#         db.session.commit()
#         sleep(1)
#
#     db.session.delete(founded_job)
#     db.session.commit()
