const express = require('express')
const app = express()
const cors = require('cors');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path');
const commonFunction = require('./common/commonFunction');
const init = require('./routes/routes').init;

app.use(cors(), function (req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
  });

app.use(morgan('dev'))
app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({ extended: false }))
// calling routes
init(app);
app.use(express.static(path.join(__dirname, 'dist')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const sqlConnectorHelper = require('./helpers/sqlConnector')

const sqlClient = sqlConnectorHelper()


sqlClient.connect(function(err) {
    if (err) {
        console.log({err});
    }
    console.log("Connected!");
    app.set('sql', sqlClient);
    setEmailSequence(sqlClient);
  });

function setEmailSequence(sqlClient) {
    let timer = 0 
    setImmediate(() => {
        console.log(`Timer is ${timer} first`);
        if (timer === 0) {
            timer = 1800000; // setting timer to half an hour
            console.log(`Setting Timer to half an hour now`, timer);
        }
        commonFunction.excuteQuery(sqlClient, 'select * from user where confirmed_email = 0')
        .then(users => {
            if (users.length) {
                let mailObj = [];
                users.forEach(user => {
                    mailObj.push({
                        to: user.email,
                        subject: 'Complete your profile',
                        html: `<div style="width: 50%;margin: 0 auto;padding: 15px;background: lightgray;">
                            <div style="font-size: 17px;text-transform: capitalize;padding-top: 5px;padding-bottom: 5px;">Hi, ${user.first_name} ${user.last_name}</div>
                            <div style="font-size: 15px;padding: 15px;">
                                Click the below link to complete your profile to the app
                            </div>
                            <div style="text-align: center;">
                                <button style="height: 20px;padding-left: 10px;padding-right: 10px;background: green;border-radius: 5px;">
                                    <a href="http://localhost:8001/edit-user/${user.user_id}" style="text-decoration: none;color: beige;">
                                        Click here
                                    </a>
                                </button>
                            </div>
                        </div>`
                    })
                });
                console.log(mailObj);
                commonFunction.sendEmail(mailObj)
                .then(res => {
                    console.log('mail sent', res);
                })
                .catch(err => {
                    console.log({err});
                });
            } else {
                console.log('All users have confirmed email');
            }
        })
        .catch(err => {
            console.log({err});
        });
    }, timer)

}

module.exports = app
