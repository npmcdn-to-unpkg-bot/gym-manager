/**
 * Created by bruno.rossini on 08/08/2016.
 */

var express = require('express'),
    router = express.Router(),
    Antopometria = require('./model');

router.get('/', function (req, res) {
    Antopometria.find({}, function(err, antopometrias) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.send(antopometrias);
        }
    }).populate('aluno');
});

router.get('/:id', function(req, res) {
    Antopometria.findById(req.params.id, function(err, antopometria) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.send(antopometria);
        }
    }).populate('aluno');
});


router.get('/find/:id', function (req, res) {
    Antopometria.find({'aluno':req.params.id}, function (err, serie) {
        if (err) {
            res.status(400);
            res.json(err.message);
        } else {
            if(serie == null)
                res.status(400);
            res.send(serie);
        }
    }).populate('aluno');
});

router.post('/', function(req, res) {
    var exercise = new Antopometria(req.body);
    exercise.save(function (err) {
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
    Antopometria.update(query, req.body, function(err, form) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.json("ok");
        }
    });
});

router.delete('/:id', function(req, res) {
    Antopometria.remove({_id: req.params.id}, function(err, antopometria) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.end();
        }
    })
});

module.exports = router;