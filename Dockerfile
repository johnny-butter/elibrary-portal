FROM node:lts-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn && yarn build


FROM nginx:stable-alpine

COPY ./.nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/build /usr/share/nginx/html

CMD [ "/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'" ]
