# use node 20 alpine image
FROM node:20-alpine

# create work directory in app folder
WORKDIR /app

ARG NUXT_PUBLIC_BACKEND_URL
ARG NUXT_PUBLIC_APP_ENV


ENV NUXT_PUBLIC_BACKEND_URL=${NUXT_PUBLIC_BACKEND_URL}
ENV NUXT_PUBLIC_APP_ENV=${NUXT_PUBLIC_APP_ENV}

# install required packages for node image
RUN apk --no-cache add openssh g++ make python3 git

# copy over package.json files
COPY package.json /app/
COPY package-lock.json /app/

# install all depencies
RUN npm i && npm cache clean --force

# copy over all files to the work directory
ADD . /app

# build the project
RUN npm run build

# expose the host and port 3000 to the server
ENV HOST=0.0.0.0
EXPOSE 3000

# run the build project with node
ENTRYPOINT ["node", ".output/server/index.mjs"]