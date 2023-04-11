const fs = require('fs')
const files = fs.readdirSync('./src/factories/products')
const {ProductService} = require('../../services/product.service')
const {AppConstant} = require("../../constants/app.constant");

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

files.forEach(fileName => {
    if (fileName.includes(AppConstant.SUB_FIX_FACTORIES)) {
        const moduleName = fileName.replaceAll(AppConstant.SUB_FIX_FACTORIES, '');
        const type = capitalizeFirstLetter(moduleName);
        const className = type + "Factory"
        const obj = require(AppConstant.DOT_SLASH + fileName)
        ProductService.registerProductType(type, obj[className])
    }
});
