const { Thought } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find().select('-__v')
            res.status(200).json(thoughts)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id}).select('-__v');
            if (!thought) {
                res.status(400).json({ message: `No thought with ID ${req.params.id}.` })
            }
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async createOneThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async updateOneThought(req, res) {
        try {
            const result = await Thought.findOneAndUpdate(
                {_id: req.params.id},
                {
                    thoughtText: req.body.thoughtText
                })
            if (!result) {
                res.status(400).json({ message: `No thought found with ${req.params.id}.` })
            }
            res.status(200).json({ message: `Thought ${req.params.id} has been updated.` })
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteOneThought(req, res) {
        try {
            const result = await Thought.findByIdAndDelete({ _id: req.params.id })
            if (!result) {
                res.status(400).json({ message: `No thought found with ID ${req.params.id}.` })
            }
            res.status(200).json({ message: `Thought ${req.params.id} has been updated.` })
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async addOneReaction(req, res) {
        try {
            const reactionBody = req.body.reactionBody;
            const result = await Thought.findByIdAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: { reactionBody } }},
                { new: true } 
            );
            if (!result) {
                res.status(400).json({ message: `No thought found with ID ${req.params.thoughtId},` })
            }
            res.status(200).json({ message: `Reaction '${res.req.body.reactionBody}' added to thought ${req.params.thoughtId}.` })
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

