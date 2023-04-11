const {NotifyTypeConstant} = require("../../constants/notify-type.constant");

class Shop001Factory {
    async buildContent(options){
        // TODO: make content notify
        return NotifyTypeConstant.SHOP_001
    }

}

module.exports = {
    Shop001Factory
}
