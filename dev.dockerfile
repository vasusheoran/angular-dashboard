#   Building the image
#       docker build -f node.dockerfile -t gokusayon/trends-dashboard . 
#   Running container after linking with existing container
#       docker run -p 80:80 --name dash -d --link trends:trends-app gokusayon/trends-dashboard    
#   Go to container shell
#       docker exec -i -t dash /bin/sh

#   Create an isolated network.
#       docker network create --driver bridge isolated_network 
#       docker run -d --net=isolated_network -p 5000:5000 --name trends gokusayon/trends-app
#       docker run -d --net=isolated_network -p 80:80 --name dash gokusayon/trends-dashboard

FROM        node:alpine as build-stage

LABEL       AUTHOR="Vasu Sheoran"  

COPY        package.json package-lock.json* ./
## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN         npm i && mkdir /ng-app && mv ./node_modules ./ng-app
WORKDIR     /ng-app

COPY        . /ng-app

## Build the angular app in production mode and store the artifacts in dist folder
# RUN         $(npm bin)/ng build --prod
# COPY        . /ng-app

# ## Build the angular app in production mode and store the artifacts in dist folder
# RUN         $(npm bin)/ng build --prod --output-path=dist

ENTRYPOINT  [ "npm", "start", "--host", "0.0.0.0" ]