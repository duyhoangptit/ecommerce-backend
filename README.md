## Setup project
- express
- morgan: thu vien in ra cac log khi mot nguoi dung request xuong
- helmet: Che dau thong tin stack phia server, thong tin rieng tu...
- compression: Nen du lieu request, response

## Mongodb
    - Nhược điểm của cách connect cũ
    - Cách connect mới, khuyên dùng
    - Kiểm tra hệ thống có bao nhiêu connect
    - THông báo khi server quá tải connect
    - Có nên disConnect liên tục hay không?
    - PoolSize là gì? vì sao lại quan trọng?
    - Nếu vượt quá kết nối poolsize?

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