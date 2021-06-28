const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
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
    role : {
        type: String,
        enum: ['user', 'admin'],
        required: true
    },
    todos : [{type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}],
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

UserSchema.pre('save', function (next) {
    if(!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, 10, (err, passHash) => {
        if (err)
            return next(err);
        this.password = passHash;
        next()
    })
})

UserSchema.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err)
            return cb(err);
        else {
            if(!isMatch)
                return cb(null, isMatch);
            return cb(null, this);
        }
    })
}

module.exports = mongoose.model('User', UserSchema)
