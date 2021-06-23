const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UesrSchema = new Schema ({
    firstname: {
        type: String,
        trim: true,
    },
    lastname: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        time: true,
        unique: true,
        required: 'Username is required',
    },
    password: {
        type: String,
        trim: true,
        required: 'Password is Required',
        validate: [
            function (input) {
                return input.length >= 6;
            },
            'Password should be longer',
        ],
    },
    email: {
        type: String,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    },
    userCreated: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
