const {UserModel} = require("../user.model");
const findByEmail = ({
    email,
    select = {
        usr_email: 1, usr_password: 2, usr_phone: 3, usr_state: 4, usr_mfa: 5, usr_id: 6, usr_salt: 7
    },
}) => {
    return UserModel.findOne({usr_email: email}).select(select).lean()
}

const findByEmailAndState = ({
     email,
     state = 'active',
     select = {
         usr_email: 1, usr_password: 2, usr_phone: 3, usr_state: 4, usr_mfa: 5, usr_id: 6, usr_salt: 7, usr_full_name: 8, usr_dob: 9, usr_avatar: 10, usr_mfa_type: 11, usr_role: 12
     },
                             }) => {
    return UserModel.findOne({usr_email: email, usr_state: state}).select(select).lean()
}

const findByUserIdAndState = ({
                                  userId,
                                  state = 'active',
                                  select = {
                                      usr_email: 1, usr_password: 2, usr_phone: 3, usr_state: 4, usr_mfa: 5, usr_id: 6, usr_salt: 7, usr_full_name: 8, usr_dob: 9, usr_avatar: 10, usr_mfa_type: 11, usr_role: 12
                                  },
                              }) => {
    return UserModel.findOne({usr_id: userId, usr_state: state}).select(select).lean()
}

module.exports = {
    findByEmail,
    findByEmailAndState,
    findByUserIdAndState
}
