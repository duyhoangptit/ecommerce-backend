const {NotifyTypeConstant} = require("../../constants/notify-type.constant");

class Order001Factory {

    async buildContent(options){
        // TODO: make content notify
        return NotifyTypeConstant.ORDER_001
    }

}

module.exports = {
    Order001Factory
}
