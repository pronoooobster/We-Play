var express = require('express');
var router = express.Router();
var Game = require('../models/game');

/**
 * post a new game
 */
router.post('/', function (req, res, next) {
    Game.create(req.body).then(function (game) {
        res.status(201).json(game);
    }).catch(next);
});

/**
 * get all the games
 */
router.get('/', async (req, res, next) => {
    const match = {};
    if(req.query.teamSize) {
        match.teamSize = req.query.teamSize;
    }

    try {
        const games = await Game.find(match);
        if (games.length === 0) {
            return res.status(204).json({ 'message': 'No games' });
        }

        res.status(200).json(games);
    } catch (err) {
        return next(err);
    }
});

/**
 * delete the entire games collection
 */
router.delete('/', async (req, res, next) => {
    try {
        const games = await Game.deleteMany({});
        if (!games) {
            return res.status(204).json({ 'message': 'No games to delete' });
        }

        res.status(200).json(games);
    } catch (err) {
        return next(err);
    }
});

/**
 * get a specific game by name
 */
router.get('/:id', async (req, res, next) => {
    try {
        const game = await Game.findOne({ name: req.params.id });
        if (!game) {
            return res.status(404).json({ 'message': 'Game not found with a given id' });
        }

        const response = {
            name: game.name,
            teamSize: game.teamSize,
            description: game.description,
            _links: {
                self: { href: `http://localhost:3000/api/games/${game.name}` },
                collection: { href: 'http://localhost:3000/api/games' },
            },
        };

        res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
});

/**
 * get a specific game by id
 */
router.get('/v2/:id', async (req, res, next) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) {
            return res.status(404).json({ 'message': 'Game not found with a given id' });
        }

        const response = {
            name: game.name,
            teamSize: game.teamSize,
            description: game.description,
            _links: {
                self: { href: `http://localhost:3000/api/games/${game.name}` },
                collection: { href: 'http://localhost:3000/api/games' },
            },
        };

        res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
});

/**
 * delete a specific game by name
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const game = await Game.findOneAndDelete({ name: req.params.id });
        if (!game) {
            return res.status(404).json({ 'message': 'Game not found with a given id' });
        }

        res.status(200).json(game);
    } catch (err) {
        return next(err);
    }
});

/**
 * put a specific game by name
 */
router.put('/:id', async (req, res, next) => {
    try {
        const game = await Game.findOneAndUpdate({ name: req.params.id }, req.body);
        if (!game) {
            return res.status(404).json({ 'message': 'Game not found with a given id' });
        }

        res.status(200).json(game);
    } catch (err) {
        return next(err);
    }
});

/**
 * patch a specific game by name
 */
router.patch('/:id', async (req, res, next) => {
    try {
        const game = await Game.findOne({ name: req.params.id });
        if (!game) {
            return res.status(404).json({ 'message': 'Game not found with a given id' });
        }

        if (req.body.teamSize) {
            game.teamSize = req.body.teamSize;
        }
        if (req.body.description) {
            game.description = req.body.description;
        }

        game.save();
        res.status(200).json(game);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;