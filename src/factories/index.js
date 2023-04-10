const fs = require('fs')
const files = fs.readdirSync('./src/factories')
const {ProductService} = require('./product.service')

const SUB_FIX_FACTORIES = '.factory.js'
const DOT_SLASH = "./"

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

files.forEach(fileName => {
    if (fileName.includes(SUB_FIX_FACTORIES)) {
        const moduleName = fileName.replaceAll(SUB_FIX_FACTORIES, '');
        const className = capitalizeFirstLetter(moduleName)
        const obj = require(DOT_SLASH + fileName)
        ProductService.registerProductType(className, obj[className])
    }
});
