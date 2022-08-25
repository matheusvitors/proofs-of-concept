const fs = require('fs');
const axios = require('axios');
const path = require('path');
const { Dropbox } = require('dropbox');
const constants = require('./constants');

const dropbox = new Dropbox({accessToken: process.env.DROPBOX_ACCESS_TOKEN});

module.exports = { 

    folder: {
        list: async () => {
            const { data } = await axios.post(constants.dropboxApi + "/files/list_folder", {"path": ""}, { headers: {
                "Authorization": 'Bearer ' + process.env.DROPBOX_ACCESS_TOKEN,
                "Content-Type": "application/json"
            }});
            
            return data;
        },
        
        create: async (name) => {
            const { data } = await axios.post(constants.dropboxApi + "/files/create_folder_v2", {"path": '/' + name, "autorename": false}, { headers: {
                "Authorization": 'Bearer ' + process.env.DROPBOX_ACCESS_TOKEN,
                "Content-Type": "application/json"
            }});

            return data;
        },
    },

    files: {
        list: async () => {

            try {
                const { result } = await dropbox.filesListFolder({path: ''})  
                return result;
            } catch (error) {
                return error;
            }

        },

        upload: async (filename) => {

            const fileLocation = path.join(__dirname, '../', '/temp',  filename)
            const file = fs.readFileSync(fileLocation);

            try {
                await dropbox.filesUpload({path: '/teste' + filename, contents: file });
                fs.unlinkSync(fileLocation);
                return "Upload feito!";
            } catch (error) {
                // console.log('não funcionou!', err);
                return error;
            }

        }
    }
}