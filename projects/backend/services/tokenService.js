const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

exports.createToken = function(user) {
  const payload = {
    sub: user,
    iat: moment().unix(),
    exp: moment().add(60, "minutes")
  };

  const response = {
    id: user.id,
    password: user.password,
    token_encode: jwt.encode(payload, config.TOKEN_SECRET),
    expiration_date: moment(payload.exp).format('YYYY/MM/DD HH:mm:ss')
  }
  
  return response;
};

exports.decodeToken = function(token) {
  const payload = jwt.decode(token, config.TOKEN_SECRET);
  const response = {
    id: payload.sub.id,
    password: payload.sub.password,
    expiration_date: moment(payload.exp).format('YYYY/MM/DD HH:mm:ss')
  };
  
  return response;
};