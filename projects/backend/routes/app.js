'use strict'

const express = require('express');
const router = express.Router();
const FileController = require('../controllers/fileController');
const AuthenticationController = require("../controllers/authenticationController");
const ApiMiddleware = require('../middlewares/apiMiddleware.js');

router.get ('/', async (req, res) => {
    res.send('Welcome to the api project of Jose Agraz - joseagraz29@gmail.com');
});
router.post ('/login', ApiMiddleware.login, AuthenticationController.login);
router.get('/secret/files', ApiMiddleware.isLoggedIn, FileController.getFileList);
router.get('/secret/file/:name', ApiMiddleware.isLoggedIn, FileController.getFile);

module.exports = router;