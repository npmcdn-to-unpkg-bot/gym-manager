/**
 * Created by bruno.rossini on 12/08/2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../users/model'),
    Exercicio = require('../exercises/model');

var SeriesSchema = new Schema({
    aluno: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    series: [
        {
            nome: {type:String, required:true},
            exercicios: [
                {
                    exercicio: {type:mongoose.Schema.Types.ObjectId, ref:'Exercise', required:true},
                    peso: {type:Number, required:true},
                    intensidade: {type:String, required:true},
                    repeticoes: {type:Number, required:true},
                    series: {type:Number, required:true}
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Serie', SeriesSchema);