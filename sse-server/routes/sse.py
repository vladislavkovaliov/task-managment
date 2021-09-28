import asyncio
import aiohttp_cors
import json

from aiohttp_sse import sse_response
from models.process import process_schema, Process, processes_schema

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