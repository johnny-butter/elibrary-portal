FROM node:lts-alpine AS builder

ARG REACT_APP_BACKEND_BASE_URL
ARG REACT_APP_OAUTH_REDIRECT_URI
ARG REACT_APP_OAUTH_GOOGLE_CLIENT_ID
ARG REACT_APP_OAUTH_FB_CLIENT_ID
ARG REACT_APP_BRAINTREE_KEY

ENV REACT_APP_BACKEND_BASE_URL ${REACT_APP_BACKEND_BASE_URL}
ENV REACT_APP_OAUTH_REDIRECT_URI ${REACT_APP_OAUTH_REDIRECT_URI}
ENV REACT_APP_OAUTH_GOOGLE_CLIENT_ID ${REACT_APP_OAUTH_GOOGLE_CLIENT_ID}
ENV REACT_APP_OAUTH_FB_CLIENT_ID ${REACT_APP_OAUTH_FB_CLIENT_ID}
ENV REACT_APP_BRAINTREE_KEY ${REACT_APP_BRAINTREE_KEY}

WORKDIR /app
COPY . .
RUN yarn && yarn build


FROM nginx:stable-alpine

COPY ./.nginx/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/build /usr/share/nginx/html

CMD [ "/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'" ]
