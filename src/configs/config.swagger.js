const swaggerUi = require('swagger-ui-express');
const swaggerDocumentJson = require('../../docs/swagger.json')

const fs = require("fs")
const YAML = require('yaml')
const file  = fs.readFileSync('./docs/swagger.yaml', 'utf8')
const swaggerDocumentYaml = YAML.parse(file)

const options = {
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
    app.use('/api-docs', swaggerUi.serveFiles(null, options), swaggerUi.setup(null, options));
}

module.exports = {
    configSwagger
}