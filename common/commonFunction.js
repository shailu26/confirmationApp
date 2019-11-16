const Email = require('../services/email');

let email = new Email();

module.exports = {
  'excuteQuery': async function (sql, myQuery) {
    return new Promise((resolve, reject) => {
      sql.query(myQuery, (err, res) => {
        if (err) {
          console.log(`err in exectuting query -> ${myQuery}\n Error -> `, err)
          reject(err);
        } else {
          // console.log("res in cmn",res)
          resolve(res);
        }
      })
    })
  },
  'sendEmail': function (mailArray) {
    return new Promise((resolve, reject) => {
      let promiseArr = [];
      mailArray.forEach(mail => {
        promiseArr.push(email.send(mail));
      });
      Promise
        .all(promiseArr)
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    })


  }
}
