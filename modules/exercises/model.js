/**
 * Created by bruno.rossini on 03/08/2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ExerciseSchema = new Schema({
    nome: {type:String, required:true},
    categoria: {type: String, required:true},
    picture: {type: Buffer, contentType: String}
});

module.exports = mongoose.model('Exercise', ExerciseSchema);