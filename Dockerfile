FROM node:16-alpine

# tao ra cho toi folder ten la app, chuyen toi den duong dan app
WORKDIR /app

# copy toan bo thu muc goc vao ben trong image thu muc app
COPY . .

# install dependency
RUN npm install

CMD ["npm", "run", "start"]