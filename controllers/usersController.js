const { User } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find().select('-__v')
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id }).select('-__v')

            if (!user) {
                return res.status(400).json({ message: `No user with id ${req.params.id}.` });
            }
            res.status(200).json({ user })

        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createOneUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateOneUser(req, res) {
        try {
            const result = await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    username: req.body.username,
                    email: req.body.email
                })
            if (!result) {
                res.status(400).json({ message: `No user found with ID ${req.params.id}.` })
            }
            res.status(200).json({ message: `User ${req.params.id} has been updated` })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async deleteOneUser(req, res) {
        try {
            const result = await User.findByIdAndDelete({ _id: req.params.id })
            if (!result) {
                res.status(400).json({ message: `No user found with ID ${req.params.id}` })
            }
            res.status(200).json({ message: `User ${req.params.id} has been deleted.` })
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async addToFriendList(req, res) {
        try {
            const result = await User.findByIdAndUpdate(
                { _id: req.params.id },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );
            if (!result) {
                res.status(400).json({ message: `No friend found with ID ${req.params.friendId}.` })
            }
            res.status(200).json({ message: `Friend ${req.params.id} added to friend list.` });
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFromFriendList(req, res) {
        try {
            const result = await User.findByIdAndUpdate(
                { _id: req.params.id },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )
            if (!result) {
                res.status(400).json('No friend found with that ID')
            }
            res.status(200).json({ message: `Friend ${req.params.id} removed from friend list.` });
        } catch (err) {
            res.status(500).json(err);
        }
    }
}