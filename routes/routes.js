module.exports = { 
    'init': function (app) {
        // Insert routes belo
        app.use('/api/user', require('../api/user'));
    }
};