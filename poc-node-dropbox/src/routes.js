const { Router } = require('express');
const multer = require('multer');
const DropboxService = require('./dropbox.service');


const routes = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'D:/Matheus/Meus Projetos/poc-node-dropbox/temp')
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    }
})

const upload = multer({storage})


routes.get('/files/list', async (req, res) => {

    try {
        const files = await DropboxService.files.list();
        res.json({files});
    } catch (error) {
        res.json({
            message: error.message,
            stack: error.stack,
            data: error.response.data
        });
        console.log(error);
    }
})

routes.post('/files/upload', upload.single('file'), async (req, res) => {

    const { filename } = req.body;
    console.log('filename', filename);

    try {
        const response = await DropboxService.files.upload(filename);
        res.json({response});

    } catch (error) {
        res.json({
            message: error.message,
            stack: error.stack,
            data: error.response?.data
        });
        console.log(error);
    }
})

routes.get('/folders', async (req, res) => {
    try {
        const folders = await DropboxService.folder.list();
        res.json({folders});

    } catch (error) {
        res.json({
            message: error.message,
            stack: error.stack,
            data: error.response?.data
        });
        console.log(error);

    }
})

routes.get('/folders/new/:name', async (req, res) => {

    const { name } = req.params;

    try {
        const folders = await DropboxService.folder.create(name);
        res.json({folders});

    } catch (error) {
        res.json({
            message: error.message,
            data: error.response.data,
            stack: error.stack
        });
        console.log(error);

    }
})

module.exports = routes;