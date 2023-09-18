var express = require('express');
var router = express.Router();
var Administrator = require('../models/administrator');

router.post('/', function (req, res, next) {
    // save the new game using promises
    Administrator.create(req.body).then(function (administrator) {
        res.status(201).json(administrator);
    }).catch(next);
});

router.get('/', async (req, res, next) => {
    try {
        const administrators = await Administrator.find({});
        if (administrators.length === 0) {
            return res.status(204).json({ 'message': 'No administrators' });
        }

        res.status(200).json(administrators);
    } catch (err) {
        return next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const administrator = await Administrator.findOne({ id: req.params.id });
        if (!administrator) {
            return res.status(204).json({ 'message': 'Administrator not found with a given id' });
        }

        res.status(200).json(administrator);
    } catch (err) {
        return next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const administrator = await Administrator.findOneAndDelete({ id: req.params.id });
        if (!administrator) {
            return res.status(204).json({ 'message': 'Administrator not found with a given id' });
        }

        res.status(200).json(administrator);
    } catch (err) {
        return next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const administrator = await Administrator.findOneAndUpdate({ id: req.params.id }, req.body);
        if (!administrator) {
            return res.status(204).json({ 'message': 'Administrator not found with a given id' });
        }

        res.status(200).json(administrator);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;