const express = require('express');
const app = express();

app.get('/', function(req, res) {
	res.send('Welcome !');
});

app.get('/user/:name', function(req, res) {
	var response = req.params['name'];
	
	if (response == 'Theo') 
	{
		res.send( "Hello, I'm Theo " );
	}
	else if (response == 'Victor') 
	{
		res.send( "Hello, I'm Victor ! " );
	}
	else
	{
		res.send('Hello ' + response);
	}
});

app.get('/user', function(req, res) {
	res.send("404 code : Name not found");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = app;