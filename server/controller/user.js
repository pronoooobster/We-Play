var express = require('express');
var router = express.Router();
var User = require('../models/user');
const user = require('../models/user');

router.post('/api/users', function (req, res, next) {
    User.create(req.body).then(function (user) {
        res.send(user);
    }).catch(next);
});

router.get('/api/users', async (req, res, next) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            return res.status(204).json({ 'message': 'No users' });
        }

        res.send(users);
    } catch (err) {
        return next(err);
    }
});

router.get('/api/users/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({ userName: req.params.id });
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        res.send(user);
    } catch (err) {
        return next(err);
    }
});

router.delete('/api/users/:id', async (req, res, next) => {
    try {
        const user = await User.findOneAndDelete({ userName: req.params.id });
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        res.send(user);
    } catch (err) {
        return next(err);
    }
});

router.put('/api/users/:id', async (req, res, next) => {
    try{
        const user = await User.findOneAndUpdate({ userName: req.params.id }, req.body);
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        res.send(user);
    } catch (err) {
        return next(err);
    }
});

router.patch('/api/users/:id', async (req, res, next) => {
    try{
        const user = await User.findOne({ userName: req.params.id });
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        if (req.body.userName) {
            user.userName = req.body.userName;
        }

        if (req.body.email) {
            user.email = req.body.email;
        }

        if (req.body.date_of_birth) {
            user.date_of_birth = req.body.date_of_birth;
        }

        if (req.body.password) {
            user.password = req.body.password;
        }

        if (req.body.friendslist) {
            user.friendslist = req.body.friendslist;
        }

        user.save();
        res.json(user);
    } catch (err) {
        return next(err);
    }
});

// relationships

router.get('/api/users/:id/clans', async (req, res, next) => {
    try {
        const user = await User.findOne({ userName: req.params.id }).populate('clansList');
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        res.send(user.clansList);
    } catch (err) {
        return next(err);
    }
});

router.post('/api/users/:id/clans', async (req, res, next) => {
    try {
        const user = await User.findOne({ userName: req.params.id });
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        user.clansList.push(req.body);
        user.save();
        res.json(user);
    } catch (err) {
        return next(err);
    }
});

// specific clan

router.get('/api/users/:id/clans/:clanId', async (req, res, next) => {
    try {
        const user = await User.findOne({ userName: req.params.id }).populate('clansList');
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        const clan = user.clansList.find(clan => clan.name === req.params.clanId);
        if (!clan) {
            return res.status(204).json({ 'message': 'Clan not found with a given id' });
        }

        res.send(clan);
    } catch (err) {
        return next(err);
    }
});

router.delete('/api/users/:id/clans/:clanId', async (req, res, next) => {
    try {
        const user = await User.findOne({ userName: req.params.id }).populate('clansList');
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        const clan = user.clansList.find(clan => clan.name === req.params.clanId);
        if (!clan) {
            return res.status(204).json({ 'message': 'Clan not found with a given id' });
        }

        user.clansList.pull(clan);
        user.save();
        res.send(user);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
