const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type : String,
        maxLength: 50
    },
    email: {
        type: String,
        trim:  true, // 빈칸 없애줌
        unique: 1
    },
    password: {
        type: String,
        maxLength: 10
    },
    lastname: {
        type: String,
        maxLength: 50
    },
    role: {
        //유저에 따라 관리자 될수도
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})
const User = mongoose.model('User', userSchema)

module.exports = {User}