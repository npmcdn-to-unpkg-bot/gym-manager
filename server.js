/**
 * Created by bruno.rossini on 03/08/2016.
 */
var database = require('./config/database'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
	cors = require('cors'),
    path = require('path'),
    http = require('http').Server(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

var api = {};
api.users = require('./modules/users/route');
api.exercises = require('./modules/exercises/route');

app.use('/users', api.users);
app.use('/exercises', api.exercises);
app.use(express.static(path.join(__dirname, './www')));

var server = http.listen(8080, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});
