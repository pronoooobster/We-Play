var express = require('express');
var router = express.Router();
var Clan = require('../models/clan');

router.post('/', function (req, res, next) {
    // save the new clan using promises
    Clan.create(req.body).then(function (clan) {
        res.status(201).json(clan);
    }).catch(next);
});

router.get('/', async (req, res, next) => {
    // sorting clans by size
    const sort = {};
    if(req.query.sortBy) {
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }
    // filtering clans by size
    const match = {};
    if(req.query.size) {
        match.size = req.query.size;
    }

    try {
        const clans = await Clan.find(match).sort(sort);
        if (clans.length === 0) {
            return res.status(204).json({ 'message': 'No clans' });
        }

        // send the list of clans with 200 status code
        res.status(200).json(clans);
    } catch (err) {
        return next(err);
    }
});


router.get('/:id', async (req, res, next) => {
    try {
        const clan = await Clan.findOne({ name: req.params.id });
        if (!clan) {
            return res.status(204).json({ 'message': 'Clan not found with a given id' });
        }

        const response = {
            name: clan.name,
            size: clan.size,
            gamesList: clan.gamesList,
            users : clan.users,
            _links: {
                self: { href: `http://localhost:3000/api/clans/${clan.name}` },
                collection: { href: 'http://localhost:3000/api/clans' },
                games: { href: `http://localhost:3000/api/clans/${clan.name}/games` },
                users: { href: `http://localhost:3000/api/clans/${clan.name}/users` },
            },
        };


        res.status(200).json(response);
    } catch (err) {
        return next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const clan = await Clan.findOneAndDelete({ name: req.params.id });
        if (!clan) {
            return res.status(204).json({ 'message': 'Clan not found with a given id' });
        }

        res.status(200).json(clan);
    } catch (err) {
        return next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const clan = await Clan.findOneAndUpdate({ name: req.params.id }, req.body);
        if (!clan) {
            return res.status(204).json({ 'message': 'Clan not found with a given id' });
        }

        res.status(200).json(clan);
    } catch (err) {
        return next(err);
    }
});

// relationships

router.get('/:id/games', async (req, res, next) => {
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

router.get('/:id/users', async (req, res, next) => {
    try {
        const clan = await Clan.findOne({ name: req.params.id }).populate('users');
        if (!clan) {
            return res.status(204).json({ 'message': 'Clan not found with a given id' });
        }
    
        res.send(clan.users);
    } catch (err) {
        return next(err);
    }
});


router.post('/:id/users', async (req, res, next) => {
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

router.post('/:id/games', async (req, res, next) => {
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

// specific game/user

router.get('/:id/users/:userId', async (req, res, next) => {
    try {
        const clan = await Clan.findOne({ name: req.params.id }).populate('users');
        if (!clan) {
            return res.status(204).json({ 'message': 'Clan not found with a given id' });
        }

        const user = clan.users.find(user => user.userName === req.params.userId);
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }
        
        res.send(user);
    } catch (err) {
        return next(err);
    }
});

router.get('/:id/games/:gameId', async (req, res, next) => {
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

router.delete('/:id/games/:gameId', async (req, res, next) => {
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

router.delete('/:id/users/:userId', async (req, res, next) => {
    try {
        const clan = await Clan.findOne({ name: req.params.id }).populate('users');
        if (!clan) {
            return res.status(204).json({ 'message': 'Clan not found with a given id' });
        }

        const user = clan.users.find(user => user.userName === req.params.userId);
        if (!user) {
            return res.status(204).json({ 'message': 'User not found with a given id' });
        }

        clan.users.pull(user);
        await clan.save();
        res.send(user);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
