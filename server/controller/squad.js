var express = require('express');
var router = express.Router();
var Squad = require('../models/squad');
const squad = require('../models/squad');

router.post('/api/squads', function (req, res, next) {
    // save the new squad using promises
    Squad.create(req.body).then(function (squad) {
        res.status(201).json(squad);
    }).catch(next);
});

router.get('/api/squads', async (req, res, next) => {
    try {
        const squads = await Squad.find({});
        if (squads.length === 0) {
            return res.status(204).json({ 'message': 'No squads' });
        }

        res.status(200).json(squads);
    } catch (err) {
        return next(err);
    }
});


router.get('/api/squads/:id', async (req, res, next) => {
    try {
        const squad = await Squad.findOne({ id: req.params.id });
        if (!squad) {
            return res.status(204).json({ 'message': 'Squad not found with a given id' });
        }

        res.status(200).json(squad);
    } catch (err) {
        return next(err);
    }
});

router.delete('/api/squads/:id', async (req, res, next) => {
    try {
        const squad = await Squad.findOneAndDelete({ id: req.params.id });
        if (!squad) {
            return res.status(204).json({ 'message': 'Squad not found with a given id' });
        }   

        res.status(200).json(squad);
    } catch (err) {
        return next(err);
    }
});

router.put('/api/squads/:id', async (req, res, next) => {
    try {
        const squad = await Squad.findOneAndUpdate({ id: req.params.id }, req.body);
        if (!squad) {
            return res.status(204).json({ 'message': 'Squad not found with a given id' });
        }

        res.status(200).json(squad);
    } catch (err) {
        return next(err);
    }
});

router.patch('/api/squads/:id', async (req, res, next) => {
    // be able to change the name, game, description, currentPlayers or maxPlayers
    try {
        const squad = await Squad.findOne({ id: req.params.id });
        if (!squad) {
            return res.status(204).json({ 'message': 'Squad not found with a given id' });
        }

        if (req.body.name) {
            squad.name = req.body.name;
        }
        if (req.body.game) {
            squad.game = req.body.game;
        }
        if (req.body.description) {
            squad.description = req.body.description;
        }
        if (req.body.currentPlayers) {
            squad.currentPlayers = req.body.currentPlayers;
        }
        if (req.body.maxPlayers) {
            squad.maxPlayers = req.body.maxPlayers;
        }

        squad.save();
        res.status(200).json(squad);
    } catch (err) {
        return next(err);
    }

});

module.exports = router;
