const { Thought } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find().select('-__v').lean()
            res.status(200).json(thoughts)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id});
            if (!thought) {
                res.status(400).json({ message: `No thought with ID ${req.params.id}.` })
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

