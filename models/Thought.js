const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const ReactionSchema = require('./Reaction')

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: "Username is required",
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // utilizes get function (in this case the dateFormat Util) to get value back reformatted
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: "Username is required",
    },
    // Imports reaction schema into array
    reactions: [ReactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// get total count of reactions and replies on retrieval on THOUGHT-schema attribute
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// create the Thought model using the ThoughtSchema
const Thought = model('Thought', ThoughtSchema);

// export the Thought model
module.exports = Thought;