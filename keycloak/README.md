To run Keycloak in Docker container

1. Adjust file system path of the realm config in docker-compose.yaml. It must be an absolute path.
Important! for Windows system, path must be in UNIX format:

Example:
C:\IdeaProjects\moneyservice\keycloak\realm-export.json
should be replaced with:
/mnt/c/IdeaProjects/moneyservice/keycloak/realm-export.json 

2. Execute this command in the current directory:

docker-compose -f ./docker-compose.yaml up
