/**
 * Created by bruno.rossini on 12/08/2016.
 */
/**
 * Created by bruno.rossini on 03/08/2016.
 */
var express = require('express'),
    router = express.Router(),
    Serie = require('./model');

router.get('/', function (req, res) {
    Serie.find({}, function(err, series) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.send(series);
        }
    }).populate('aluno').populate('exercicio');
});

router.get('/:id', function(req, res) {
    Serie.findById(req.params.id, function(err, serie) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.send(serie);
        }
    }).populate('aluno').populate('exercicio');
});

router.post('/', function(req, res) {
    var serie = new Serie(req.body);
    serie.save(function (err) {
        if(err) {
            console.log(err);
            res.status(400);
            res.json(err.message);
        } else {
            res.status(201);
            res.end();
        }
    });
});


router.put('/', function(req, res) {
    var query ={_id: req.body._id};
    Serie.update(query, req.body, function(err, form) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.json("ok");
        }
    });
});

router.delete('/:id', function(req, res) {
    Serie.remove({_id: req.params.id}, function(err, serie) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.end();
        }
    })
});

module.exports = router;