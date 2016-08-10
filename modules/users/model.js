/**
 * Created by bruno.rossini on 03/08/2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    nome: {type:String, required:true},
    endereco: {type:String, required:true},
    telefone: {type:String, required:false},
    celular: {type:String, required:false},
    email: {type:String, required:false},
    cpf: {type:String, required:true, index:{unique:true}},
    dataInicial: {type:Date, required:false},
    nascimento: {type:Date, required:false},
    peso: {type:Number, required:false},
    estatura: {type:Number, required:false},
    sexo: {type:String, required:true},
    telefoneContato: {type:String, required:false},
    nomeContato: {type:String, required:false},
	fatorRh: {type:String, required:false},
	sangue: {type:String, required:false},
	observacoes: {type:String, required:false},
	frequencia: {type:String, required:false},
	atividade: {type:String, required:false},
	intensidade: {type:String, required:false},
    matricula: {type:String, required:false, index:{unique:true}}
});

UserSchema.pre('save', function(next) {
    var user = this;
    user.matricula = new Date().getFullYear() + (Math.floor(Math.random()*90000) + 10000).toString();
    next();
});

module.exports = mongoose.model('User', UserSchema);