commonFunction = require('../../common/commonFunction');

module.exports = {
    'getUserDetail' : function (sql, userId) {
    let q = `select * from user where user_id=${+userId}`
    return commonFunction.excuteQuery(sql, q);
    },
    'updateUserById': function (sql, userId, reqBody) {
        let {firstName, lastName, email, address, confirmedEmail} = reqBody;
        let q = `UPDATE user SET first_name = '${firstName}', last_name='${lastName}', email='${email}' , address='${address}', confirmed_email='${confirmedEmail}' WHERE user_id = ${+userId}`;
        return commonFunction.excuteQuery(sql, q);
    }
}
