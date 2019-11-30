const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Please provide valid email')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minlength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password Cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            if ( value < 0 && value > 99 ) {
                throw new Error('Age must be between 1 and 99')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    //Delete sensitive data
    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.statics.findByCrendentials = async function(email, password) {
    const user = await User.findOne({email})
    if (!user) {
        throw new Error('Sorry!! Unable to login......')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Sorry!! Unable to login......')
    }
    return user
}

const User = mongoose.model('User', userSchema)
module.exports = User