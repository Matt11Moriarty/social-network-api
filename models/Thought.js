const { Schema, Types, model } = require('mongoose');
const reactionSchema = require('../models/Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            unique: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true,
            ref: 'user'
        },
        reactions: [{
            type: reactionSchema,
            ref: 'reaction'
        }]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        id: false
    },
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    })
    .set(function (v) {
        this._reactionCount = v;
    })

thoughtSchema
    .virtual('formattedCreatedAt')
    .get(function () {
        return new Date(this.createdAt).toLocaleString();
    });


const Thought = model('thought', thoughtSchema);

module.exports = Thought;