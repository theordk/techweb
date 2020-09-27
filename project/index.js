const express = require('express');
const app = express();

var a = require('./handle')

app.use('/', a);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});