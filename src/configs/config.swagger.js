const swaggerUi = require('swagger-ui-express');
const swaggerDocumentJson = require('../../docs/swagger.json')

const fs = require("fs")
const YAML = require('yaml')
const file  = fs.readFileSync('./docs/swagger.yaml', 'utf8')
const swaggerDocumentYaml = YAML.parse(file)

const optionsOpenApi = require('./config.openapi')
const swaggerJsdoc = require("swagger-jsdoc")
const specs = swaggerJsdoc(optionsOpenApi);

const openApi = (app) => {
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs)
    )
    routeDefault(app)
}

const optionsSwagger = {
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

const configSwagger = (app) => {
    app.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocumentJson));
    app.get("/api-docs/swagger.yaml", (req, res) => res.json(swaggerDocumentYaml));
    app.use('/api-docs', swaggerUi.serveFiles(null, optionsSwagger), swaggerUi.setup(null, optionsSwagger));
    routeDefault(app)
}

const routeDefault = (app) => {
    // setting router default
    app.use((req, res, next) => {
        if (req.url === '/') {
            res.redirect('/api-docs');
            return;
        }
        next();
    })
}

module.exports = {
    configSwagger,
    openApi
}