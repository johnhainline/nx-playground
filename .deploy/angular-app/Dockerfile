FROM nginx:alpine

COPY .deploy/angular-app/nginx.conf /etc/nginx/

## install openssl
#RUN apk add --update openssl && rm -rf /var/cache/apk/*
#
## add certs
#WORKDIR /etc/ssl
#RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx.key -out nginx.crt -subj "/C=US/ST=MO/L=STL/O=Emerson/CN=sensipredict.com"

## Work in default nginx html directory
WORKDIR /usr/share/nginx/html
## Remove default nginx website
RUN rm -rf ./*
## Add our app to nginx html directory
COPY dist/apps/angular-app .

EXPOSE 4201

CMD ["nginx"]
