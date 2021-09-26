from .jobs import JobsResource
from .processes import ProcessesResource


def init_routes(app, api):
    api.add_resource(JobsResource, '/jobs')
    api.add_resource(ProcessesResource, '/<job_id>/processes')
