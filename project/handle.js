const express = require('express')
const app = express.Router()

app.get('/', function(req, res) {
	res.send('Welcome on the landing page!')
});

app.get('/user/:name', function(req, res) {
	var response = req.params['name']

	switch (response)
	{
		case 'Theo':
			res.send( "Hello, I'm Theo ! I'm 21" )
			break
		case 'Victor':
			res.send( "Hello, I'm Victor ! I'm 21" )
			break
		default:
			res.send('Hello ' + response);
	}
});

app.get('/user', function(req, res) {
	res.send("404 code : Name not found")
});

module.exports = app;