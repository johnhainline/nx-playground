# base image
FROM node:12-alpine

# install openssl
#RUN apk add --update openssl && rm -rf /var/cache/apk/*

# add certs
#WORKDIR /etc/ssl
#RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx.key -out nginx.crt -subj "/C=US/ST=MO/L=STL/O=Emerson/CN=sensipredict.com"

# set working directory
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

# install and cache app dependencies
RUN npm install --production

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# copy the actual app files into the container
COPY dist/apps/nest-server /app/nest-server

# expose ports for the app
EXPOSE 3333
EXPOSE 4001

# start app
#CMD ["npm", "start"]
CMD ["node", "nest-server/main.js"]
