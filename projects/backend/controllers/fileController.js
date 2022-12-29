'use strict'

const {getListFiles, formatDataFile} = require("../services/fileService");
const fs = require("fs");

const controller = {
    getFileList: async (req, res) => {
        const listFiles = await getListFiles()
        if (listFiles) {
            return res.status(200).send({
                status: 'success',
                data : listFiles
            });
        } else {
            return res.status(400).send({
                status: 'error',
                message: 'Data Not Validated'
            });
        }
    },
    getFile: async (req, res) => {
        const {name} = req.params;
        const dirFile = `./temp/${name}`;
        fs.stat(dirFile, async (err, stats) => {
            if (err) {
                return res.status(404).send({
                    status: 'error',
                    message: 'File not found, check the name and its extension'
                });
            } else if(stats) {
                await formatDataFile(name)
                .then(resp => {
                    return res.status(200).send({
                        status: 'success',
                        data: resp
                    });
                })
                .catch(err => {
                    return res.status(400).send({
                        status: 'error',
                        message: err.message
                    });
                });
            } else {
                return res.status(400).send({
                    status: 'error',
                    message: 'Data Not Validated'
                });
            }
        })
    },
};

module.exports = controller;


