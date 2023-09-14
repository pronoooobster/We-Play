var express = require('express');
var router = express.Router();
var Clan = require('../models/clan');

router.post('/api/clans', function (req, res, next) {
    // save the new clan using promises
    Clan.create(req.body).then(function (clan) {
        res.send(clan);
    }).catch(next);
});

router.get('/api/clans', async (req, res, next) => {
    try {
        const clans = await Clan.find({});
        if (clans.length === 0) {
            return res.status(204).json({ 'message': 'No clans' });
        }

        res.send(clans);
    } catch (err) {
        return next(err);
    }
});


router.get('/api/clans/:id', async (req, res, next) => {
    try {
        const clan = await Clan.findOne({ name: req.params.id });
        if (!clan) {
            return res.status(204).json({ 'message': 'Clan not found with a given id' });
        }

        res.send(clan);
    } catch (err) {
        return next(err);
    }
});

router.delete('/api/clans/:id', async (req, res, next) => {
    try {
        const clan = await Clan.findOneAndDelete({ name: req.params.id });
        if (!clan) {
            return res.status(204).json({ 'message': 'Clan not found with a given id' });
        }

        res.send(clan);
    } catch (err) {
        return next(err);
    }
});

router.put('/api/clans/:id', async (req, res, next) => {
    try {
        const clan = await Clan.findOneAndUpdate({ name: req.params.id }, req.body);
        if (!clan) {
            return res.status(204).json({ 'message': 'Clan not found with a given id' });
        }

        res.send(clan);
    } catch (err) {
        return next(err);
    }
});

// relationships

router.get('/api/clans/:id/games', async (req, res, next) => {
    try {
        const clan = await Clan.findOne({ name: req.params.id }).populate('gamesList');
        if (!clan) {
            return res.status(204).json({ 'message': 'Clan not found with a given id' });
        }

        res.send(clan.gamesList);
    } catch (err) {
        return next(err);
    }
});

router.post('/api/clans/:id/games', async (req, res, next) => {
    try {
        const clan = await Clan.findOne({ name: req.params.id });
        if (!clan) {
            return res.status(204).json({ 'message': 'Clan not found with a given id' });
        }

        clan.gamesList.push(req.body);
        await clan.save();
        res.send(clan);
    } catch (err) {
        return next(err);
    }
});

// specific game

router.get('/api/clans/:id/games/:gameId', async (req, res, next) => {
    try {
        const clan = await Clan.findOne({ name: req.params.id }).populate('gamesList');
        if (!clan) {
            return res.status(204).json({ 'message': 'Clan not found with a given id' });
        }

        const game = clan.gamesList.find(game => game.name === req.params.gameId);
        if (!game) {
            return res.status(204).json({ 'message': 'Game not found with a given id' });
        }

        res.send(game);
    } catch (err) {
        return next(err);
    }
});

router.delete('/api/clans/:id/games/:gameId', async (req, res, next) => {
    try {
        const clan = await Clan.findOne({ name: req.params.id }).populate('gamesList');
        if (!clan) {
            return res.status(204).json({ 'message': 'Clan not found with a given id' });
        }

        const game = clan.gamesList.find(game => game.name === req.params.gameId);
        if (!game) {
            return res.status(204).json({ 'message': 'Game not found with a given id' });
        }

        clan.gamesList.pull(game);
        await clan.save();
        res.send(game);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
