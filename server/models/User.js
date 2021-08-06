const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken');
//salt이용해서 비밀번호 암호화 so salt 먼저 생성 필요
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 100
    },
    email: {
        type: String,
        trim: true, // 빈칸 없애줌
        unique: 1
    },
    password: {
        type: String,
        maxLength: 100
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

userSchema.pre('save', function (next) {

    var user = this;
    if (user.isModified('password')) {
        //password변경시에만 실행되게
        //비밀번호 암호화.
        //Technique 1 (generate a salt and hash on separate function calls)
        bcrypt.genSalt(saltRounds, function (err, salt) {

            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                // Store hash in your password DB.
                //hash는 암호화된 비밀번호
                if (err) return next(err)
                user.password = hash;
                next()
            });
        });
    }
    else{
        next()
    }
}) //user 모델에 저장하기 전에 함수 실행

userSchema.statics.findByToken = function(token,cb){
    var user = this;
   // user._id + '' = token  '' : secretToken
    //가져온 토큰을 decode 한다.
    jwt.verify(token,'secretToken',function(err,decoded){
        //유저 아이디를 이용해서 유저를 찾은 다음에
        //클라이언트에서 가져온 토큰과 데이터베이스에 보관된 토큰이
        //일치하는지 확인
        user.findOne({"_id":decoded, "token": token}, function(err,user){
            if(err) return cb(err)
            cb(null,user)
        })
    })
}
userSchema.methods.comparePassword = function(plainPassword, cb){
    bcrypt.compare(plainPassword, this.password,function(err, isMatch){
        if(err) return cb(err);
        cb(null , isMatch)
    })
}
userSchema.methods.generateToken = function(cb){
    var user = this;
   var token = jwt.sign(user._id.toHexString(),  'secretToken')
    /*user._id + 'secretToken' = token
    so 'secretToken' -> user._id
    */
   user.token = token
   user.save(function(err,user){
       if(err) return cb(err)
       cb(null, user)
   })
}
const User = mongoose.model('User', userSchema)

module.exports = { User }