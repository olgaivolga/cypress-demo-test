#!/bin/bash

# Start the demo app
python3 -u -m http.server 4444 &> http.server.log & echo $! > http.server.pid
tail -f http.server.log
