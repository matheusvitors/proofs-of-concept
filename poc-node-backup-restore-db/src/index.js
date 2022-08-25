const express = require("express");
const cors = require("cors");
const routes = require("./routes");
require('dotenv').config();

const app = express();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log("API online on port " + port);
});
