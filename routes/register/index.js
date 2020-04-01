/**
 * Created by Shubham Sharma on 30/03/2020.
 */

const validator      = require('../authentication/validator');
const authentication = require('../authentication/middleware');
const register       = require('./controller');

app.post('/check_user', validator.checkUser, authentication.authenticate, register.checkUser);
app.post('/register_user', validator.registerUser, authentication.authenticate, register.registerUser);