const {decodeToken} = require('../services/tokenService');
var moment = require('moment');

module.exports = {
  login: (req, res, next) => {

    if (!req.body.username || req.body.username.length < 3) {
      return res.status(200).send({
        status: 'err',
        message: 'Please enter a username with min. 3 chars',
      });
    }
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(200).send({
        status: 'err',
        message: 'Please enter a password with min. 6 chars',
      });
    }
    next();
  },
  isLoggedIn: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const payload = decodeToken(token);

      if (payload.expiration_date <= moment().format('YYYY/MM/DD HH:mm:ss')) {
        return res.status(200).send({
          status: 'err',
          message: 'Your session has expired',
        });
      }
      req.user = payload.sub;
      next();
    } catch (err) {
      return res.status(401).send({
        status: 'err',
        message: 'Your session has expired',
      });
    }
  }
};



