A use case of Clean Architecture in Node.js comprising of Express.js, MongoDB
and Redis as the main (but replaceable) infrastructure.

### Overview project

This example is a simple RESTful API application about eCommerce, by using the
_Clean Architecture_.

The objective of _Clean Architecture_ by [Robert C. Martin] is the separation of
concerns in software.
This separation is achieved by dividing the software into layers. Each layer is
encapsulated by a higher level layer and the way to communicate between the
layers is with the _Dependency Rule_.

![](https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg)

---

### Note list (Todos list)

-  [x] Sign up & use RSA with JWT
-  [x] Custom dynamic middleware for api key and permissions
-  [x] Handle error
-  [x] Write API login
-  [x] Write API logout
-  [x] Handle refresh token
-  [x] API product using Polymorphic Pattern, Factory Pattern
-  [ ] Write API discount
    - Create inventory, discount model ✅
    - Get discount amount ❌
    - Get all discounts with product ✅
    - Create discount ✅
    - Get all discounts ❌
-  [ ] Write API cart
    - Add to cart ❌
    - Delete user item cart ❌
    - Get list user cart ❌
    - Update quantity item cart ❌
-  [ ] Write API order
    - Using optimistic with Redis ❌
    - Checkout review ❌
-  [ ] Write API inventory
    - Add stock to inventory ❌
-  [ ] Logging API using discord

---

### Setup package project

    -  @odaddy/terminus: "^4.12.1"
    -  bcrypt: "^5.1.0"
    -  compression: "^1.7.4"
    -  cors: "^2.8.5"
    -  crypto: "^1.0.1"
    -  discord.js: "^14.11.0"
    -  dotenv: "^16.3.1"
    -  express: "^4.18.2"
    -  helmet: "^7.0.0"
    -  http-status-codes: "^2.2.0"
    -  jsonwebtoken: "^9.0.1"
    -  lodash: "^4.17.21"
    -  mongoose: "^7.4.0"
    -  morgan: "^1.10.0"
    -  slugify: "^1.6.6"

---
