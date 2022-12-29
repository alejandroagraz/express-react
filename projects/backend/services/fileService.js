const User = require('../models/user');
const axios = require('axios');
const fs = require("fs");
const Global = require('../config/Global');
const {API_EXT, API_EXT_TOKEN}= Global;

exports.getUser = (username) => {
    return User.findOne({
        $or: [{ email: username }, { username }],
    });
};

exports.getListFiles = async () => {
    const dirFile = './temp';
    fs.mkdirSync(dirFile, { recursive: true })
    const dataAllFiles = fs.readdirSync(dirFile);
    let resp = [];
    for (let i = 0; i < dataAllFiles.length; i++) {
        const data = await this.formatDataFile(dataAllFiles[i]).then(res => {
            return res
        });
        resp.push(data)
    }
    return resp
};

exports.downloadAllFiles = async  () => {
    const uri = `${API_EXT}secret/files`;
    await axios.get(uri, {
        headers: {
            Authorization: `Bearer ${API_EXT_TOKEN}`,
        },
    })
    .then((res) => {
        res.data.files.map(elemet => {
            this.downloadFile(elemet)
        })
    })
    .catch((err) => err);
};

exports.downloadFile = async (fileName) => {
    const uri = `${API_EXT}secret/file/${fileName}`;
    const dirFile = './temp';
    fs.mkdirSync(dirFile, { recursive: true })
    const config = {
        headers: {
            Authorization: `Bearer ${API_EXT_TOKEN}`,
        },
        responseType: "stream"
    };
    return  axios.get(uri, config)
    .then(async (res) => {
        const file =  res.data.pipe( fs.createWriteStream(`${dirFile}/${fileName}`));
        return file.path
    })
    .catch((err) => {
        return err
    });
};

exports.formatDataFile = async (fileName) => {
    const dirFile = `./temp/${fileName}`;
    return new Promise((resolve, reject) => {
        fs.readFile(dirFile, 'utf-8', (err, data) => {
            if(err) {
                reject(err);
            } else {
                const resp = []
                const arrTemp = []
                const dataFile = data.replace('file,','').
                replace('text,','').replace('number,','').
                replace('hex','').split(/\r\n|\r|\n/,-1).
                toString().split(`${fileName},`);
                dataFile.map((data, index) => {
                    if (index > 0) {
                        const formatData = data.split(',').filter(Boolean);
                        let fileData = {
                            text: null,
                            number: null,
                            hex: null,
                        }
                        switch (formatData.length) {
                            case 1:
                                fileData.text = formatData[0]
                            break
                            case 2:
                                fileData.text = formatData[0]
                                fileData.number = formatData[1]
                            break
                            case 3:
                                fileData.text = formatData[0]
                                fileData.number = formatData[1]
                                fileData.hex = formatData[2]
                            break
                        }
                        arrTemp.push(fileData)
                    }
                })
                resp.push({file: fileName, lines: arrTemp})
                resolve(resp)
            }
        });
    })
};