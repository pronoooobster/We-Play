var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.post('/', function (req, res, next) {
    User.create(req.body).then(function (user) {
        // res.send(user);
        res.status(201).json(user);
    }).catch(next);
});

router.get('/', async (req, res, next) => {
    try {
        const users = await User.find({});
        if (users.length === 0) {
            return res.status(204).json({ 'message': 'No users' });
        }

        res.status(200).json(users);
    } catch (err) {
        return next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        const response = {
            _id: user._id,
            email: user.email,
            friendslist: user.friendslist,
            clansList: user.clansList,
            _links: {
                self: { href: `http://localhost:3000/api/users/${user._id}` },
                collection: { href: 'http://localhost:3000/api/users' },
                clans: { href: `http://localhost:3000/api/users/${user._id}/clans` },
                friendslist: { href: `http://localhost:3000/api/users/${user._id}/friendslist` },
            },
        };  
        res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id });
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        res.status(200).json(user);
    } catch (err) {
        return next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try{
        const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        res.status(200).json(user);
    } catch (err) {
        return next(err);
    }
});

router.patch('/:id', async (req, res, next) => {
    try{
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        if (req.body._id) {
            user._id = req.body._id;
        }

        if (req.body.email) {
            user.email = req.body.email;
        }

        if (req.body.friendslist) {
            user.friendslist = req.body.friendslist;
        }

        user.save();
        res.status(200).json(user);
    } catch (err) {
        return next(err);
    }
});

// relationships

router.get('/:id/clans', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate('clansList');
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        res.send(user.clansList);
    } catch (err) {
        return next(err);
    }
});

router.post('/:id/clans', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
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

// squad
router.get('/:id/squad', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate('currentSquad');
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        res.send(user.currentSquad);
    } catch (err) {
        return next(err);
    }
});

router.post('/:id/squad', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        user.currentSquad = req.body;
        user.save();
        res.json(user);
    } catch (err) {
        return next(err);
    }
});

router.delete('/:id/squad', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        user.currentSquad = null;
        user.save();
        res.json(user);
    } catch (err) {
        return next(err);
    }
});

// specific clan

router.get('/:id/clans/:clanId', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate('clansList');
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

router.delete('/:id/clans/:clanId', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate('clansList');
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

//friends list

router.get('/:id/friendslist', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate('friendslist');
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        res.send(user.friendslist);
    } catch (err) {
        return next(err);
    }
});

router.post('/:id/friendslist', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate('friendslist');
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        user.friendslist.push(req.body);
        user.save();
        res.json(user);
    } catch (err) {
        return next(err);
    }
});

//get specific friend

router.get('/:id/friendslist/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate('friendslist');
        if(!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }
    const friend = user.friendslist.find(friend => friend._id === req.params.id);
    if (!friend){
        return res.status(204).json({ 'message': 'Friend not found with a given id' });
    }

    res.send(friend);
    } catch (err) {
        return next(err);
    }
});


module.exports = router;
