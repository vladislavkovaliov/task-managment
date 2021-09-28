from .jobs import JobsResource, JobResource
from .processes import ProcessesResource, ProcessResource


def init_routes(app, api):
    api.add_resource(JobsResource, '/jobs')
    api.add_resource(JobResource, '/jobs/<job_id>')
    api.add_resource(ProcessesResource, '/<job_id>/processes')
    api.add_resource(ProcessResource, '/<job_id>/processes/<process_id>')
