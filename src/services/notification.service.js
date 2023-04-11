const _NotifyModel = require('../models/notification.model')
const {BusinessLogicError} = require("../core/error.response");
const {i18n}= require('../configs/config.i18n')
const {NotifyTypeConstant} = require("../constants/notify-type.constant");

class NotificationService {
    static notifyTypeRegistry = {}

    static registerNotifyType(type, classRef) {
        NotificationService.notifyTypeRegistry[type] = classRef
    }

    static async getContent(type, payload) {
        const notifyClassFactory = NotificationService.notifyTypeRegistry[type]
        if (!notifyClassFactory) throw new BusinessLogicError(i18n.__('messages.error006', type))

        return new notifyClassFactory(payload).buildContent()
    }
}

const pushNotificationToSystem = async ({
    type = NotifyTypeConstant.SHOP_001,
    receivedId = 1,
    senderId = '',
    options = {}}) => {

    let notiContent = await NotificationService.getContent(type, options)

    return await _NotifyModel.create({
        noti_type: type,
        noti_content: notiContent,
        noti_sender_id: senderId,
        noti_received_id: receivedId,
        noti_options: options
    })
}

const listNotificationByUser = async({
    userId = 1,
    type = 'ALL',
    isRead = 0
}) => {
    const match = {noti_received_id: userId}
    if (type !== 'All') {
        match['noti_type'] = type
    }
    return await NOTI.aggregate([
        {
            $match: match
        },
        {
            $project: {
                noti_type: 1,
                noti_sender_id: 1,
                noti_received_id: 1,
                noti_content: 1,
                createAt: 1,
                noti_options: 1
            }
        }
    ])
}

module.exports = {
    pushNotificationToSystem,
    NotificationService
}
