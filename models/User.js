const { Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: 'You must enter a username!'
        },
        email: {
            type: String,
            required: 'You must enter a valid email address!',
            unique: true,
            match: [/.+\@.+\..+/, 'You must enter a valid email address!']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User =  model('User', userSchema);

module.exports = User;