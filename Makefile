NODE_LOCATION=$(shell which node | grep .asdf || echo node-not-found)
DOCKER_LOCATION=$(shell which docker-compose || echo docker-not-found)
GVERSION=$(shell git describe --match "[0-9]*\.[0-9]*\.[0-9]*")
GBRANCH=$(shell git rev-parse --abbrev-ref HEAD)
GREPO=$(shell basename `git rev-parse --show-toplevel`)
HOST_NAME=$(shell hostname | tr [:upper:] [:lower:])
NPM_LOCATION=$(shell npm outdated -g | cut -f1 -d\  | fgrep npm || which npm)

.PHONY : audit audit_fix audit_force_fix clean clean_docker commitready deps docker_build
.PHONY : test test_behaviors uat update_lock watch_tests jenkins_build jenkins_status ready_build
.DEFAULT_GOAL:=deps

${NPM_LOCATION}: ${NODE_LOCATION}
	npm install -g npm@latest
	touch `which npm`

${NODE_LOCATION}:
	asdf install
	touch `which node`

${DOCKER_LOCATION}:
	@echo "You ain't got docker, you need more whales on this computer man!"
	@exit 1

audit: ${NPM_LOCATION} deps
	npm audit --production

audit_fix:
	npm audit fix --production

audit_force_fix:
	npm audit fix --production --force

e2e: ready_build
	docker-compose -f ./docker-compose.yml down -v
	docker-compose -f ./docker-compose.yml up -d --remove-orphans --build --scale test=0
	docker-compose -f ./docker-compose.yml run --use-aliases test

clean:
	rm -rf *.zip
	rm -rf ./build/*
	rm -rf node_modules

clean_docker:
	docker-compose -f ./docker-compose.yml down -v

commitready: clean deps audit test e2e clean_docker

deps: ${NPM_LOCATION} ${NODE_LOCATION}
	npm install

docker_build: deps ${DOCKER_LOCATION} ready_build
	docker build -t ${NAME} .

publish: docker_build release

ready_build:
	-mkdir ./build
	cp package* ./build/
	sed -ie 's/\"version\": \"1.0.0\"/\"version\": \"${GVERSION}\"/' ./build/package.json
	rm ./build/package.jsone
	npm install --production --prefix './build/'

release: ${DOCKER_LOCATION} deps
	`aws ecr get-login --no-include-email`
	aws s3 sync ansible_assets/ s3://scm-artifactory/scm_api_accounts/${GVERSION}/ansible_assets
	docker tag scm_api_accounts 042967111928.dkr.ecr.us-east-1.amazonaws.com/scm_api_accounts:${GVERSION}
	docker tag scm_api_accounts 042967111928.dkr.ecr.us-east-1.amazonaws.com/scm_api_accounts:latest
	docker push 042967111928.dkr.ecr.us-east-1.amazonaws.com/scm_api_accounts:${GVERSION}
	docker push 042967111928.dkr.ecr.us-east-1.amazonaws.com/scm_api_accounts:latest

test:
	./node_modules/mocha/bin/mocha --ui tdd

test_behaviors:
	docker-compose run --rm test

jenkins_build: CRUMB=$(shell curl -s -u "jenkins:jenkins" http://jenkins.nonprod.scmcloudapi.com:8080/crumbIssuer/api/json | jq -r '. | "\(.crumbRequestField):\(.crumb)"')
jenkins_build:
	curl -X POST -s -H "${CRUMB}" -u jenkins:jenkins http://jenkins.nonprod.scmcloudapi.com:8080/job/Github%20Organization/job/${GREPO}/job/${GBRANCH}/build?delay=0sec

jenkins_status:
	curl -s http://jenkins:jenkins@jenkins.nonprod.scmcloudapi.com:8080/job/Github%20Organization/job/${GREPO}/job/${GBRANCH}/api/json | jq .color

update_lock: ${NPM_VERSION}
	rm package-lock.json && npm install

watch_tests: ${NPM_LOCATION}
	./node_modules/mocha/bin/mocha --ui tdd --watch --reporter min
