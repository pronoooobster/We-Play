var express = require('express');
var router = express.Router();
var Squad = require('../models/squad');

router.post('/api/squads', function(req, res, next){
    var camel = new Squad(req.body);
    camel.save(function(err, camel) {
        if (err) { return next(err); }
        res.status(201).json(camel);
    })
});

router.get('/api/squads', function(req, res, next) {
    Squad.find(function(err, squads) {
        if (err) { return next(err); }
        res.json({'squads': squads });
    });
});

router.get('/api/squads/:id', function(req, res, next) {
    var id = req.params.id;
    Squad.findById(id, function(err, camel) {
        if (err) { return next(err); }
        if (camel === null) {
            return res.status(404).json({'message': 'Squad not found!'});
        }
        res.json(camel);
    });
});

router.delete('/api/squads/:id', function(req, res, next) {
    var id = req.params.id;
    Squad.findOneAndDelete({_id: id}, function(err, camel) {
        if (err) { return next(err); }
        if (camel === null) {
            return res.status(404).json({'message': 'Squad not found'});
        }
        res.json(camel);
    });
});

module.exports = router;
