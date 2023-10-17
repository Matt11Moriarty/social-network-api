const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find().select('-__v').lean()
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id }).select('-__v').lean();

            if (!user) {
                return res.status(400).json({message: 'No user with this id'});
            }
            res.json({ user })

        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createOneUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}