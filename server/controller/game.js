var express = require('express');
var router = express.Router();
var Game = require('../models/game');

router.post('/api/games', function (req, res, next) {
    // save the new game using promises
    Game.create(req.body).then(function (game) {
        res.send(game);
    }).catch(next);
});

router.get('/api/games', async (req, res, next) => {
    try {
        const games = await Game.find({});
        if (games.length === 0) {
            return res.status(204).json({ 'message': 'No games' });
        }

        res.send(games);
    } catch (err) {
        return next(err);
    }
});

router.get('/api/games/:id', async (req, res, next) => {
    try {
        const game = await Game.findOne({ name: req.params.id });
        if (!game) {
            return res.status(204).json({ 'message': 'Game not found with a given id' });
        }

        res.send(game);
    } catch (err) {
        return next(err);
    }
});

router.delete('/api/games/:id', async (req, res, next) => {
    try {
        const game = await Game.findOneAndDelete({ name: req.params.id });
        if (!game) {
            return res.status(204).json({ 'message': 'Game not found with a given id' });
        }

        res.send(game);
    } catch (err) {
        return next(err);
    }
});

router.put('/api/games/:id', async (req, res, next) => {
    try {
        const game = await Game.findOneAndUpdate({ name: req.params.id }, req.body);
        if (!game) {
            return res.status(204).json({ 'message': 'Game not found with a given id' });
        }

        res.send(game);
    } catch (err) {
        return next(err);
    }
});

router.patch('/api/games/:id', async (req, res, next) => {
    // be able to change the team size or description
    try {
        const game = await Game.findOne({ name: req.params.id });
        if (!game) {
            return res.status(204).json({ 'message': 'Game not found with a given id' });
        }

        if (req.body.teamSize) {
            game.teamSize = req.body.teamSize;
        }
        if (req.body.description) {
            game.description = req.body.description;
        }

        game.save();
        res.json(game);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;