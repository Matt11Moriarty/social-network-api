const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(thoughtText) {
                    return thoughtText >= 1 ? true : false 
                }
            }
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true,
            ref: 'user'
        }
    }
)