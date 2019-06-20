//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/clickmeeting-rec-app'));

app.get('/*', function(req, res) {

    res.sendFile(path.join(__dirname + '/dist/clickmeeting-rec-app/index.html'));
});

// Start the app by listening on the default Heroku port
var server = app.listen(process.env.PORT || 3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server is listening at http://%s:%s', host, port);
});
