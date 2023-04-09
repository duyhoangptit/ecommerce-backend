## Setup lib project
    - express
    - helmet
    - bcrypt": "^5.1.0",: encrypt, decrypt
    - body-parser": "^1.20.2",: config parser request body
    - compression": "^1.7.4",: nen request response
    - cookie-parser": "^1.4.6",: config parser request body
    - dotenv": "^16.0.3",: cau hinh doc file enviroment .env
    - helmet": "^6.0.1",: Che dau thong tin stack phia server, thong tin rieng tu...
    - html-to-text": "^9.0.4",: convert html to text
    - i18n": "^0.15.1",: cau hinh da ngon ngu
    - jsonwebtoken": "^9.0.0",: thu vien jwt
    - lodash": "^4.17.21",
    - mongoose": "^6.9.2",: connect mongodb
    - morgan": "^1.10.0",: thu vien in ra cac log khi mot nguoi dung request xuong
    - nodemailer": "^6.9.1",: cho phep send mail
    - slugify": "^1.6.6",: convert text to slug, example: ao khoac nam -> ao-khoac-nam
    - swagger-ui-express": "^4.6.2": config swagger
    - yaml": "^2.2.1": config swagger
    - chai
    - nodemon

## Mongodb
    - Nhược điểm của cách connect cũ
    - Cách connect mới, khuyên dùng
    - Kiểm tra hệ thống có bao nhiêu connect
    - THông báo khi server quá tải connect
    - Có nên disConnect liên tục hay không?
    - PoolSize là gì? vì sao lại quan trọng?
    - Nếu vượt quá kết nối poolsize?
    - MongoDB Desing pattern
          - Polymorphic pattern
          - Attribute pattern
          - Bucket pattern
          - Outlier pattern
          - Computed pattern
          - Subnet pattern
          - Extended reference pattern
          - Approximation pattern
          - Tree pattern
          - Preallocation pattern
          - Document versioning pattenr
          - Schema versioning pattern


## Course series
    1 - Welcome, welcome, welcome -   

    • Course: Node.js B...  
    2 - Những folders và packages cần thiết khi khởi tạo Project! -
    
    • Section 2: Node.j...  
    3 - Connect MongoDB to Node.js Using Mongoose và 7 điều lưu ý  -
    
    • Section 3: Connec...  
    4 - Cách triển khai env cho các level khác nhau. -
    
    • Section 4: Lịch s...  
    5 - Sign-up Shop (1) -
    
    • Section 5: Api Si...  
    5 - Sign-up Shop (2) -
    
    • Section 5: Reup S...  
    6 - Middleware apikey and permissions -
    
    • Section 6:  Custo...  
    7 - Xử lý ErrorHandler trong API -
    
    • Section 7: Xử lý ...
### Handler auth
    https://github.com/madhums/node-express-mongoose-demo.git

### Api key
    `Lưu trữ key cung cấp cho các đối tác được truy cập vào hệ thống`

### Design Schema MongoDB - Polymorphic Pattern
    - 1document 1kb -> 50tr = 50gb

### Fulltext search in mongoDB
    [https://anonystick.com/blog-developer/full-text-search-mongodb-chi-mot-bai-viet-khong-can-nhieu-2022012063033379]

### Implement Swagger
    npm install swagger-ui-express swagger-jsdoc --save

### Cron job
    npm install node-cron
![img.png](img.png)

    const cron = require("node-cron");
    cron.schedule("*/15 * * * * *", function () {
        console.log("---------------------");
        console.log("running a task every 15 seconds");
    });

### Send mail
    npm install node-mailer

[chedule-cron-job-in-node](https://reflectoring.io/schedule-cron-job-in-node/)

### Send notify - Firebase

### Deployment docker + nginx + kubernetes

### S3

### Message broker - ActiveMQ

### Logger
    npm i winston express-winston winston-mongodb


### Unit test with chai + mocha
    npm i chai chai-http mocha mocha-suppress-logs --save