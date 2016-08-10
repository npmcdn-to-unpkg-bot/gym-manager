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

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 80,
    ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);