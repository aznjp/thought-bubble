const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: "Username is required",
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: "Password is required",
        trim: true,
        match: '^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$'
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    toJSON: {
        virtuals: true,
    },
    id: false
});

// get total count of friends and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// get total count of thoughts and replies on retrieval
UserSchema.virtual('thoughtCount').get(function() {
    return this.thoughts.length;
});

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User model
module.exports = User;