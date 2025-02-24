var express = require('express');
var router = express.Router();
var Squad = require('../models/squad');

/**
 * post a new squad
 */
router.post('/', function (req, res, next) {
    Squad.create(req.body).then(function (squad) {
        res.status(201).json(squad);
    }).catch(next);
});

/**
 * get all the squads
 */
router.get('/', async (req, res, next) => {
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

/**
 * delete the entire squads collection
 */
router.delete('/', async (req, res, next) => {
    try {
        const squads = await Squad.deleteMany({});
        if (!squads) {
            return res.status(204).json({ 'message': 'No squads to delete' });
        }
        res.status(200).json(games);
    } catch (err) {
        return next(err);
    }
});

/**
 * get all the squads that are not full
 */
router.get('/notfull', async (req, res, next) => {
    try {
        // find squads with less players than maxPlayers
        const squads = await Squad.find( { $expr: { $gt: [ "$maxPlayers", { $size: "$currentPlayers" } ] } } ).populate('game');
        if (squads.length === 0) {
            return res.status(204).json({ 'message': 'No squads' });
        }

        res.status(200).json(squads);
    } catch (err) {
        return next(err);
    }
});

/**
 * get squad by id
 */
router.get('/:id', async (req, res, next) => {
    try {
        const squad = await Squad.findById(req.params.id);
        if (!squad) {
            return res.status(404).json({ 'message': 'Squad not found with a given id' });
        }

        const response = {
            id: squad.id,
            name: squad.name,
            game: squad.game,
            description: squad.description,
            currentPlayers: squad.currentPlayers,
            maxPlayers: squad.maxPlayers,
            _links: {
                self: { href: `http://localhost:3000/api/v1/squads/${squad.id}` },
                collection: { href: 'http://localhost:3000/api/v1/squads' },
                game: { href: `http://localhost:3000/api/games/v2/${squad.game}` },
            },
        };

        res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
});

/**
 * delete a specific squad
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const squad = await Squad.findByIdAndDelete(req.params.id);
        if (!squad) {
            return res.status(404).json({ 'message': 'Squad not found with a given id' });
        }

        res.status(200).json(squad);
    } catch (err) {
        return next(err);
    }
});

/**
 * put a specific squad
 */
router.put('/:id', async (req, res, next) => {
    try {
        const squad = await Squad.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!squad) {
            return res.status(404).json({ 'message': 'Squad not found with a given id' });
        }

        res.status(200).json(squad);
    } catch (err) {
        return next(err);
    }
});

/**
 * patch a specific squad
 */
router.patch('/:id', async (req, res, next) => {
    try {
        const squad = await Squad.findById(req.params.id);
        if (!squad) {
            return res.status(404).json({ 'message': 'Squad not found with a given id' });
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


/**
 * get all the players in a specific squad
 */
router.get('/:id/users', async (req, res, next) => {
    try {
        const squad = await Squad.findById(req.params.id).populate('currentPlayers');
        if (!squad) {
            return res.status(404).json({ 'message': 'Squad not found with a given id' });
        }

        res.send(squad.currentPlayers);
    } catch (err) {
        return next(err);
    }
});

/**
 * post a new player to a specific squad
 */
router.post('/:id/users', async (req, res, next) => {
    try {
        const squad = await Squad.findById(req.params.id);
        if (!squad) {
            return res.status(404).json({ 'message': 'Squad not found with a given id' });
        }

        // check if the user is already in the squad
        const user = squad.currentPlayers.find(user => user == req.body._id);
        if (user) {
            return res.status(400).json({ 'message': 'User already in the squad' });
        }

        // check if the squad is full
        if (squad.currentPlayers.length >= squad.maxPlayers) {
            return res.status(400).json({ 'message': 'Squad is full' });
        }

        squad.currentPlayers.push(req.body);
        squad.save();
        res.json(squad);
    } catch (err) {
        return next(err);
    }
});

/** 
 * get a specific player from the squad
 */
router.get('/:id/users/:userId', async (req, res, next) => {
    try {
        const squad = await Squad.findById(req.params.id).populate('currentPlayers');
        if (!squad) {
            return res.status(404).json({ 'message': 'Squad not found with a given id' });
        }

        const user = squad.currentPlayers.find(user => user._id === req.params.userId);
        if (!user) {
            return res.status(404).json({ 'message': 'User not found with a given id' });
        }

        res.send(user);
    } catch (err) {
        return next(err);
    }
});

/**
 * remove a specific player from the squad
 */
router.delete('/:id/users/:userId', async (req, res, next) => {
    try {
        const squad = await Squad.findById(req.params.id).populate('currentPlayers');
        if (!squad) {
            return res.status(404).json({ 'message': 'Squad not found with a given id' });
        }

        const user = squad.currentPlayers.find(user => user._id === req.params.userId);
        if (!user) {
            return res.status(404).json({ 'message': 'User not found with a given id' });
        }

        squad.currentPlayers.pull(user);
        squad.save();
        res.json(squad);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
