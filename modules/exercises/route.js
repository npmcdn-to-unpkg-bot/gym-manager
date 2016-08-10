/**
 * Created by bruno.rossini on 08/08/2016.
 */

var express = require('express'),
    router = express.Router(),
    Exercise = require('./model');

router.get('/', function (req, res) {
    Exercise.find({}, function(err, exercises) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.send(exercises);
        }
    })
});

router.get('/:id', function(req, res) {
    Exercise.findById(req.params.id, function(err, exercise) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.send(exercise);
        }
    });
});

router.post('/', function(req, res) {
    var exercise = new Exercise(req.body);
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
    Exercise.update(query, req.body, function(err, form) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.json("ok");
        }
    });
});

router.delete('/:id', function(req, res) {
    Exercise.remove({_id: req.params.id}, function(err, user) {
        if(err) {
            res.status(400);
            res.json(err.message);
        } else {
            res.end();
        }
    })
});

module.exports = router;