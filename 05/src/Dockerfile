# from docker image
FROM node:latest

# export server port
EXPOSE 8888

# copy application
COPY server.js .

# copy npm package config
COPY package.json .
COPY package-lock.json .

# install dependencies
RUN npm install

# run server
CMD ["node", "server.js"]