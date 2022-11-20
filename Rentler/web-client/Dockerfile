FROM node:16.14.2
WORKDIR /app/web-client
COPY ./web-client ./
RUN npm install --silent
ENTRYPOINT ["npm", "start"]
EXPOSE 3000