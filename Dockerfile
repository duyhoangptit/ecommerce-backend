FROM node:18.11.0

ENV NODE_ENV=uat

# tao ra cho toi folder ten la app, chuyen toi den duong dan app
WORKDIR /app

# copy config package.json
COPY package*.json .

# copy toan bo thu muc goc vao ben trong image thu muc app
COPY . .

EXPOSE 3056

CMD ["npm", "run", "start"]