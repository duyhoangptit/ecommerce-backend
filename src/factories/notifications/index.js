const fs = require('fs')
const files = fs.readdirSync('./src/factories/notifications')
const {NotificationService} = require('../../services/notification.service')
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
        NotificationService.registerNotifyType(type, obj[className])
    }
});
