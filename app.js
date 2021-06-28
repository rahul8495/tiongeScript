const express = require('express');
const app = express();
const header = require("./header");
const orderRoutes = require('./order')
const bodyParser = require('body-parser');



// using body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(header);
app.use('/api', orderRoutes);
module.exports = app;