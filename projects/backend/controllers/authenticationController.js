'use strict'

const {createToken} = require('../services/tokenService');
const bcrypt = require('bcryptjs');
const {getUser, downloadAllFiles} = require("../services/fileService");

const controller = {
    login: async (req, res) => {
        const params = req.body;
        const user = await getUser(params.username)
        if (user) {
            bcrypt.compare(params.password, user.password, (err, resp) => {
                if (err) {
                    return res.status(400).send({
                        status: 'error',
                        message: err.message
                    });
                }
                if (resp) {
                    downloadAllFiles()
                    setTimeout(()=>{
                        const token = createToken(req.body);
                        return res.status(200).send({
                            status: 'success',
                            data: {
                                access_token: token.token_encode,
                            }
                        });
                    },2000)

                } else {
                    return res.status(401).send({
                        status: 'error',
                        message: 'Username or password is incorrect'
                    });
                }
            });
        } else {
            return res.status(401).send({
                status: 'error',
                message: 'Username or password is incorrect'
            });
        }
    },
};

module.exports = controller;


