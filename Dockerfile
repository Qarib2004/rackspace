FROM ${DOCKER_PROXY}/node:17-alpine as BUILD

RUN mkdir /app

WORKDIR /app

ENV NODE_OPTIONS=--openssl-legacy-provider

COPY package.json .

COPY package-lock.json .

RUN apk update && apk upgrade && \
    apk add --no-cache git

RUN npm install

COPY . .

RUN npm run build



FROM ${DOCKER_PROXY}/nginx:1.27.1-alpine

EXPOSE 80

RUN rm -f /usr/share/nginx/html/*

RUN echo "server { listen 80; listen [::]:80; server_name localhost; server_tokens off; root /usr/share/nginx/html; location / { try_files \$uri \$uri/ /index.html; } }" > /etc/nginx/conf.d/default.conf

COPY --from=BUILD /app/dist/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

