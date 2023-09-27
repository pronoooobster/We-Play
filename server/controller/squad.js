var express = require('express');
var router = express.Router();
var Squad = require('../models/squad');
const squad = require('../models/squad');

router.post('/', function (req, res, next) {
    // save the new squad using promises
    Squad.create(req.body).then(function (squad) {
        res.status(201).json(squad);
    }).catch(next);
});

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


router.get('/:id', async (req, res, next) => {
    try {
        const squad = await Squad.findOne({ id: req.params.id });
        if (!squad) {
            return res.status(204).json({ 'message': 'Squad not found with a given id' });
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
                game: { href: `http://localhost:3000/api/v1/squads/${squad.game}` },
            },
        };

        res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
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

router.put('/:id', async (req, res, next) => {
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

router.patch('/:id', async (req, res, next) => {
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

// relationships

router.get('/:id/users', async (req, res, next) => {
    try {
        const squad = await Squad.findOne({ id: req.params.id }).populate('currentPlayers');
        if (!squad) {
            return res.status(204).json({ 'message': 'Squad not found with a given id' });
        }

        res.send(squad.currentPlayers);
    } catch (err) {
        return next(err);
    }
});

router.post('/:id/users', async (req, res, next) => {
    try {
        const squad = await Squad.findOne({ id: req.params.id });
        if (!squad) {
            return res.status(204).json({ 'message': 'Squad not found with a given id' });
        }

        squad.currentPlayers.push(req.body);
        squad.save();
        res.json(squad);
    } catch (err) {
        return next(err);
    }
});

// specific user

router.get('/:id/users/:userId', async (req, res, next) => {
    try {
        const squad = await Squad.findOne({ id: req.params.id }).populate('currentPlayers');
        if (!squad) {
            return res.status(204).json({ 'message': 'Squad not found with a given id' });
        }

        const user = squad.currentPlayers.find(user => user.userName === req.params.userId);
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        res.send(user);
    } catch (err) {
        return next(err);
    }
});

router.delete('/:id/users/:userId', async (req, res, next) => {
    try {
        const squad = await Squad.findOne({ id: req.params.id }).populate('currentPlayers');
        if (!squad) {
            return res.status(204).json({ 'message': 'Squad not found with a given id' });
        }

        const user = squad.currentPlayers.find(user => user.userName === req.params.userId);
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        squad.currentPlayers.pull(user);
        squad.save();
        res.json(squad);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
