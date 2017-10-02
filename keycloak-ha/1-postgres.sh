#!/usr/bin/env bash

docker run --name postgres -e POSTGRES_DATABASE=keycloak \
                            -e POSTGRES_USER=keycloak \
                            -e POSTGRES_PASSWORD=password \
                            -e POSTGRES_ROOT_PASSWORD=password -d postgres
