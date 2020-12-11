const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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

// create the Reaction model using the ReactionSchema (Used as subdocument for Thoughtschema.reactions array)
const Reaction = model('Reaction', ReactionSchema);

// export the Reaction model
module.exports = Reaction;