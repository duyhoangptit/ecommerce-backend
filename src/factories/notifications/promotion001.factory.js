const {NotifyTypeConstant} = require("../../constants/notify-type.constant");

class Promotion001Factory {
    async buildContent(options){
        // TODO: make content notify
        return NotifyTypeConstant.PROMOTION_001
    }

}

module.exports = {
    Promotion001Factory
}
