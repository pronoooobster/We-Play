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

//relationships

router.get('api/clan/:id/users', async (req, res, next) => {
    try {
        const clan = await Clan.findOne({ name: req.params.id }, req.body).populate('users');
        if (!clan) {
            return res.status(204).json({ 'message': 'Clan not found with a given id' });
        }
    
        res.send(Clan.users);
    } catch (err) {
        return next(err);
    }
});

router.post('/api/clans/:id/users', async (req, res, next) => {
    try {
        const clan = await Clan.findOne({ name: req.params.id });
        if (!clan) {
            return res.status(204).json({ 'message': 'Clan not found with a given id' });
        }

        clan.users.push(req.body);
        clan.save();
        res.json(clan);
    } catch (err) {
        return next(err);
    }
});

router.get('/api/clans/:id/users/:userId', async (req, res, next) => {
    try {
        const clan = await Clan.findOne({ name: req.params.id }).populate('users');
        if (!clan) {
            return res.status(204).json({ 'message': 'Clan not found with a given id' });
        }

        const user = clan.currentPlayers.find(user => user.userName === req.params.userId);
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        res.send(user);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
