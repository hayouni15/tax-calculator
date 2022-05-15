#!/bin/bash
DOCKER_TAX_CALC=tax-calculator

docker build --tag $DOCKER_TAX_CALC -f Dockerfile .
docker run -it -v $(pwd):/app --entrypoint ./entryPoint.sh --network="bridge" $DOCKER_TAX_CALC  /bin/bash
