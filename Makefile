ifeq (,$(BRANCH))
  BRANCH=$(shell git rev-parse --abbrev-ref HEAD)
else
  BRANCH=master
endif

ci_build_base:
	docker build --build-arg BRANCH=${BRANCH} -t demo-base:${BRANCH} -f ./deploy/Dockerfile.base .

ci_build_app:
	docker build --build-arg BASE_IMAGE=olgaivolga/demo-base:${BRANCH} -t demo-app:${BRANCH} -f ./deploy/Dockerfile.demo .

ci_build_test:
	docker build --build-arg DEMO_IMAGE=demo-app:${BRANCH} -t demo-test:${BRANCH} -f ./deploy/Dockerfile.test .

ci_cypress:
	docker run --rm \
    -v ${PWD}/results:/root/results \
    -v ${PWD}/screenshots:/root/cypress/screenshots \
    -v ${PWD}/videos:/root/cypress/videos \
    demo-test:${BRANCH} ./run-tests.sh

run_app:
	docker run -it --rm -p 4444:4444 demo-test:${BRANCH} ./run-demo.sh


ci_build_test_api:
	docker build --build-arg BASE_IMAGE=olgaivolga/demo-base:${BRANCH} -t test-api:${BRANCH} -f ./deploy/Dockerfile.test.api .

run_api_mock_server:
	docker run -it --rm -p 5000:5000 test-api:${BRANCH} /bin/bash
