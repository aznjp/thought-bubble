const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// moved in reaction schema into thought models to simplify format because it will only be utilized in reactions field array in thought schema
// also must be first or else there is no reference for the thought schema
const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: "Username is required",
        maxLength: 280,
    },
    username: {
        type: String,
        required: "Username is required",
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
}, {
    toJSON: {
        getters: true
    }
});

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
        trim: true
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