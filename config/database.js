/**
 * Created by bruno.rossini on 03/08/2016.
 */
var mongoose = require('mongoose');

// mongoose.connect('mongodb://brunodev:Bero2401@ds139675.mlab.com:39675/bodyinmotion')
mongoose.connect('mongodb://localhost:27017/bm-database')

var database = mongoose.connection;

database.on('error', function (err) {
    console.log('Erro de conexao.', err);
});

database.on('open', function () {
    console.log('Conexão aberta.')
});

database.on('connected', function (err) {
    console.log('Conectado')
});

database.on('disconnected', function (err) {
    console.log('Desconectado')
});

database.on('error', function (err) {
    console.log('Erro de padrão de conexão do Mongoose: ' + err);
});

process.on('SIGINT', function () {
    db.close(function () {
        console.log('conexão Mongoose desconectada através de término do node CRTL + C');
        process.exit(0);
    });
});

module.exports = database;