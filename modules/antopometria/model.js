/**
 * Created by bruno.rossini on 03/08/2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../users/model');

var AntopometriaSchema = new Schema({
    estatura: {type:String},
    peso: {type:String},
    imc: {type:String},
    pct: {type:String},
    cmb: {type:String},
    gordura: {type:String},
    absoluta: {type:String},
    magra: {type:String},
    abdomen: {type:String},
    quadril: {type:String},
    rcq: {type:String},
    biceps: {type:String},
    subescapular: {type:String},
    axilar: {type:String},
    suprailiaca: {type:String},
    dobra: {type:String},
    peitoral: {type:String},
    coxa: {type:String},
    panturrilha: {type:String},
    conicidade: {type:String},
    updated: { type: Date, default: Date.now },
    aluno: {type:mongoose.Schema.Types.ObjectId, ref:'User', required:true}
});

module.exports = mongoose.model('Antopometria', AntopometriaSchema);