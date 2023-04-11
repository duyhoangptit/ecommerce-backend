const {NotifyTypeConstant} = require("../../constants/notify-type.constant");

class Order002Factory {
    async buildContent(options){
        // TODO: make content notify
        return NotifyTypeConstant.ORDER_002
    }

}

module.exports = {
    Order002Factory
}
