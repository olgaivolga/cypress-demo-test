#!/bin/bash

echo -e "Stage 0: Clone from https://github.com/webrtc/samples\n"

git clone https://github.com/webrtc/samples.git

echo -e "Stage 1: Pull base image\n"

docker pull olgaivolga/demo-base:main

echo -e "Stage 2: Build images\n"

# make ci_build_base
make ci_build_app
make ci_build_test

echo -e "Stage 3: Run tests\n"

make ci_cypress
