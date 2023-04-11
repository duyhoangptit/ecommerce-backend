const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "eCommerce Restfull API",
            version: "1.0.0",
            description:
                "Web eCommerce restfull api"
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
                description: 'Development server'
            },
            {
                url: `http://localhost:${process.env.PORT}`,
                description: 'Uat server'
            },
            {
                url: `http://localhost:${process.env.PORT}`,
                description: 'Product server'
            },
        ],
        components: {
            schemas: {
                RequestCreateCart: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'The name of the shop'
                        },

                    },
                    example: {
                        "name": "Ta Duy Hoang",
                    }
                },
                RequestUpdateCart: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'The name of the shop'
                        },

                    },
                    example: {
                        "name": "Ta Duy Hoang",
                    }
                },
                RequestDeleteCart: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'The name of the shop'
                        },

                    },
                    example: {
                        "name": "Ta Duy Hoang",
                    }
                },
                RequestRegister: {
                    type: 'object',
                    required: ['name', 'email', 'password', 'msisdn'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'The name of the shop'
                        },
                        email: {
                            type: 'string',
                            description: 'The email of the shop'
                        },
                        password: {
                            type: 'string',
                            description: 'The password of the shop'
                        },
                        msisdn: {
                            type: 'string',
                            description: 'The msisdn of the shop'
                        }
                    },
                    example: {
                        "name": "Ta Duy Hoang",
                        "email": "duyhoangaws@gmail.com",
                        "password": "123123a@",
                        "msisdn": "0948291994"
                    }
                },
                RequestLogin: {
                    type: 'object',
                    required: ['email', 'password'],
                    properties: {
                        email: {
                            type: 'string',
                            description: 'The email of the shop'
                        },
                        password: {
                            type: 'string',
                            description: 'The password of the shop'
                        },
                    },
                    example: {
                        "email": "duyhoangaws@gmail.com",
                        "password": "123123a@"
                    }
                },
                Product: {
                    type: 'object',
                    required: ['product_name', 'product_thumb', 'product_price', 'product_quality', 'product_type', 'product_attributes'],
                    properties: {
                        product_name: {
                            type: 'string',
                            description: 'The name of the product'
                        },
                        product_thumb: {
                            type: 'string',
                            description: 'The thumb of the product'
                        },
                        product_price: {
                            type: 'integer',
                            description: 'The price of the product'
                        },
                        product_quality: {
                            type: 'integer',
                            description: 'The quality of the product'
                        },
                        product_type: {
                            type: 'string',
                            description: 'The type of the product'
                        },
                        product_attributes: {
                            type: 'Array',
                            description: 'The attributes of the product'
                        }
                    },
                    example: {
                        product_name: "Quấn áo Nam siêu mát giày",
                        product_description: "Quần áo Nam gray",
                        product_price: 12345.000,
                        product_type: "Clothing",
                        product_thumb: "https://tiger01042023.s5.ap-southeast-1.amazonaws.com/PNG+image.png",
                        product_quality: 23,
                        product_attributes: {
                            brand: "TTF",
                            size: "XL",
                            material: "Thun"
                        }
                    }
                },
                Shop: {
                    type: 'object',
                    required: ['name', 'email', 'password', 'msisdn'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'The name of the shop'
                        },
                        email: {
                            type: 'string',
                            description: 'The email of the shop'
                        },
                        password: {
                            type: 'string',
                            description: 'The password of the shop'
                        },
                        msisdn: {
                            type: 'string',
                            description: 'The msisdn of the shop'
                        }
                    },
                    example: {}
                },
                Discount: {
                    type: 'object',
                    required: ['discount_code', 'discount_amount'],
                    properties: {
                        discount_code: {
                            type: 'string',
                            description: 'The name of the shop'
                        },
                        discount_amount: {
                            type: 'string',
                            description: 'The email of the shop'
                        }
                    },
                    example: {}
                },
            },
            responses : {
                400: {
                    description: 'Missing API key - include it in the Authorization header',
                    contents: 'application/json'
                },
                401: {
                    description: 'Unauthorized - incorrect API key or incorrect format',
                    contents: 'application/json'
                },
                404: {
                    description: 'Not found - the book was not found',
                    contents: 'application/json'
                }
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
                apiKey: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-api-key'
                }
            }
        },
        security: [
            {
                "apiKey": [],
                "bearerAuth": [],
            },
            {
                "apiKey": [],
            }
        ]

    },
    apis: [
        "./src/routes/*/*.js",
    ],
    swaggerOptions: {
        urls: [
            {
                url: "/api-docs/swagger.json",
                name: 'Json'
            },
            {
                url: "/api-docs/swagger.yaml",
                name: 'Yaml'
            }
        ]

    },
}

module.exports = options
