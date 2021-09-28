#!/bin/bash

yarn
yarn start &

cd sse-server
pip3 install -r req.txt
python3 index.py &
python3 sse.py &