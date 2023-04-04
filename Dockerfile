FROM node:12.18-alpine

WORKDIR /app

RUN npm install -g pm2

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent

COPY . .

# ----- If UID:GID is 1000:1000
RUN chown -R node:node /app
USER node

# ----- Else
# First find your host UID:GID using "whoami", Eg: your host user is "1111:2222"
# RUN addgroup -g 2222 appgroup
# RUN adduser -D -u 1111 appuser -G appgroup
# RUN chown -R appuser:appgroup /app
# USER appuser
# ---------------------------------------

CMD ["pm2-runtime", "ecosystem.config.js", "--env", "production"]
