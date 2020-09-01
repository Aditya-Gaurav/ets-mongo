const setutp = require('../../utils/strategy'),
    strategies = require('./strategies');

const pipe = (...functions) => args => functions.reduce((arg, fn) => fn(arg), args);

const initialiseAuthentication = app => {
    setutp();
    pipe(strategies.GoogleStrategy, strategies.FacebookStrategy)(app)
}

module.exports = { initialiseAuthentication }
