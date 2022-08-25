const express = require('express');
const cors = require('cors');
require('dotenv/config');
const routes = require('./routes');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(routes);

const port = process.env.PORT || 8000;

app.listen(process.env.PORT || 8000, function (){
    console.log("Listen on port %d", port);
});
