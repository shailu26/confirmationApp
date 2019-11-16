const userDataServiceProvider = require("../../services/sql/userDataServiceProvider");

module.exports = {
    'getUserDetail': function(req, res, next) {
        const sql = req.app.get('sql');
        let userId = req.params.userId;
        userDataServiceProvider.getUserDetail(sql, userId).then(userDetails => {
            //console.log("user details ", userDetails); 
            if (userDetails.length) {
                return res.status(201).json({
                success: true,
                message: 'successfully fetched',
                userDetails: userDetails[0]
            });
            } else {
                return res.status(401).json('Not Authorized')
            }
        }).catch(err => {
            console.log(err);
            next(err);
        })

    },

    'updateUserById' : function (req, res, next) {
        const sql = req.app.get('sql');
        let userId = req.params.userId;
        userDataServiceProvider.updateUserById(sql, userId, req.body).then(details => {
            return res.status(201).json({
                success: true,
                message: 'successfully updated',
                userDetails
            })
        }).catch(err => {
            console.log(err);
            next(err);
        })
    }
}