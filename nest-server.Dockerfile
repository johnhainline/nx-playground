FROM node:10

RUN npm install -g nodemon

ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install --production
RUN mkdir -p /app/nest-server && cp -a /tmp/node_modules /app/nest-server/

WORKDIR /app/nest-server
COPY dist/apps/nest-server/ /app/nest-server

EXPOSE 3333

CMD [ "nodemon", "main.js" ]
