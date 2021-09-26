import asyncio
from datetime import datetime

import aiohttp_cors
import json

from aiohttp import web
from aiohttp.web import Response
from aiohttp_sse import sse_response

from models.process import Process, processes_schema, process_schema

app = web.Application()

cors = aiohttp_cors.setup(app)

async def process(request):
    loop = request.app.loop
    async with sse_response(request) as response:
        while True:
            all_process = Process.query.all()
            for p in all_process:
                data = json.dumps(process_schema.dump(p))
                await response.send(data)
                await asyncio.sleep(2, loop=loop)

            data = json.dumps(processes_schema.dump(all_process))
            print(data)
            await asyncio.sleep(2, loop=loop)
    return response


if __name__ == "__main__":
    resource = cors.add(app.router.add_resource("/process"))
    cors.add(
        resource.add_route("GET", process), {
            "*": aiohttp_cors.ResourceOptions(
                expose_headers="*",
                allow_headers="*"
            )
        })

    web.run_app(app, host='127.0.0.1', port=5001)
