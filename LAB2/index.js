const express = require('express');
const app = express();

app.get('/users/:userId/channel/:channelId', function (req, res) {
  res.send(req.params)
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
