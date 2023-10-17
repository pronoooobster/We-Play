var express = require('express');
var router = express.Router();
var User = require('../models/user');

/**
 * post a new user
 */
router.post('/', function (req, res, next) {
    User.create(req.body).then(function (user) {
        res.status(201).json(user);
    }).catch(next);
});

/**
 * get all the users
 */
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

/**
 * get a specific user by id
 */
router.get('/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({ 'message': 'User not found with a given id' });
        }

        const response = {
            _id: user._id,
            email: user.email,
            name: user.name,
            photoURL: user.photoURL,
            friendslist: user.friendslist || [],
            clansList: user.clansList,
            isAdmin: user.isAdmin,
            currentSquad: user.currentSquad,
            _links: {
                self: { href: `http://localhost:3000/api/users/${user._id}` },
                collection: { href: 'http://localhost:3000/api/users' },
                clans: { href: `http://localhost:3000/api/users/${user._id}/clans` },
                friendslist: { href: `http://localhost:3000/api/users/${user._id}/friendslist` },
                currentSquad: { href: `http://localhost:3000/api/v1/squads/${user.currentSquad}` }
            },
        };
        res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
});

/**
 * delete a specific user by id
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({ 'message': 'User not found with a given id' });
        }

        res.status(200).json(user);
    } catch (err) {
        return next(err);
    }
});

/**
 * put a specific user by id
 */
router.put('/:id', async (req, res, next) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
        if (!user) {
            return res.status(404).json({ 'message': 'User not found with a given id' });
        }

        res.status(200).json(user);
    } catch (err) {
        return next(err);
    }
});

/**
 * patch a specific user by id
 */
router.patch('/:id', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({ 'message': 'User not found with a given id' });
        }

        console.log("hello43242")

        if (req.body.name) {
            console.log("hello")
            user.name = req.body.name
        }

        if (req.body.email) {
            user.email = req.body.email;
        }

        if (req.body.friendslist) {
            user.friendslist = req.body.friendslist;
        }
        if (req.body.isAdmin) {
            user.isAdmin = req.body.isAdmin;
        }

        user.save();
        res.status(200).json(user);
    } catch (err) {
        return next(err);
    }
});

// relationships
/**
 * get the clans of a specific user
 */
router.get('/:id/clans', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate('clansList');
        if (!user) {
            return res.status(404).json({ 'message': 'User not found with a given id' });
        }

        res.send(user.clansList);
    } catch (err) {
        return next(err);
    }
});

/**
 * post a new clan to a specific user
 */
router.post('/:id/clans', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({ 'message': 'User not found with a given id' });
        }

        user.clansList.push(req.body);
        user.save();
        res.json(user);
    } catch (err) {
        return next(err);
    }
});

/**
 * get a squad of a specific user
 */
router.get('/:id/squad', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate('currentSquad');
        if (!user) {
            return res.status(404).json({ 'message': 'User not found with a given id' });
        }

        res.send(user.currentSquad);
    } catch (err) {
        return next(err);
    }
});

/**
 * assign a squad of a specific user
 */
router.post('/:id/squad', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({ 'message': 'User not found with a given id' });
        }

        user.currentSquad = req.body;
        user.save();
        res.json(user);
    } catch (err) {
        return next(err);
    }
});

/**
 * remove a squad of a specific user
 */
router.delete('/:id/squad', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).json({ 'message': 'User not found with a given id' });
        }

        user.currentSquad = null;
        user.save();
        res.json(user);
    } catch (err) {
        return next(err);
    }
});

/**
 * delete the entire squads collection
 */
router.get('/:id/clans/:clanId', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate('clansList');
        if (!user) {
            return res.status(404).json({ 'message': 'User not found with a given id' });
        }

        const clan = user.clansList.find(clan => clan.name === req.params.clanId);
        if (!clan) {
            return res.status(204).json({ 'message': 'Clan not found with a given id' });
        }
        + '?_method=DELETE'
        res.send(clan);
    } catch (err) {
        return next(err);
    }
});

/**
 * remove a specific clan of a specific user
 */
router.delete('/:id/clans/:clanId', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate('clansList');
        if (!user) {
            return res.status(404).json({ 'message': 'User not found with a given id' });
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

/**
 * get the friends list of a specific user
 */
router.get('/:id/friendslist', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate('friendslist');
        if (!user) {
            return res.status(404).json({ 'message': 'User not found with a given id' });
        }

        res.send(user.friendslist);
    } catch (err) {
        return next(err);
    }
});

/**
 * post a new friend to a specific user
 */
router.post('/:id/friendslist', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ 'message': 'User not found with a given id' });
        }

        // if the user is already in the friends list, don't add them again
        const friend = user.friendslist.find(friend => friend === req.body._id);
        if (friend) {
            return res.status(400).json({ 'message': 'User is already in friends list' });
        }

        user.friendslist.push(req.body);
        user.save();
        res.json(user);
    } catch (err) {
        return next(err);
    }
});

/**
 * get a specific friend of a specific user
 */
router.get('/:id/friendslist/:friendId', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate('friendslist');
        if (!user) {
            return res.status(404).json({ 'message': 'User not found with a given id' });
        }
        const friend = user.friendslist.find(friend => friend._id === req.params.friendId);
        if (!friend) {
            return res.status(404).json({ 'message': 'Friend not found with a given id' });
        }

        res.send(friend);
    } catch (err) {
        return next(err);
    }
});


/**
 * remove a specific friend from friends list
 */
router.delete('/:id/friendslist/:friendId', async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate('friendslist');
        if (!user) {
            return res.status(404).json({ 'message': 'User not found with a given id' });
        }
        const friend = user.friendslist.find(friend => friend._id === req.params.friendId);
        if (!friend) {
            return res.status(404).json({ 'message': 'Friend not found with a given id' });
        }

        user.friendslist.pull(friend);
        user.save();
        res.send(user);
    } catch (err) {
        return next(err);
    }
});


module.exports = router;
