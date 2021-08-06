//back-end 시작점
const express = require('express')
const app = express()
const port = 5000
const {auth} = require("./middleware/auth");
const {User} = require('./models/User');
const bodyParser = require('body-parser');
const config = require('./config/key');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cookieParser());

const mongoose = require('mongoose')


mongoose.connect(config.mongoURI,{
  useNewurlParser: true, useUnifiedTopology: true, useCreateIndex: true,useFindAndModify : false
}).then(() => console.log('mongoDB connected...'))
  .catch(err => console.log(err))

  app.get('/', (req, res) => 
  res.send('Hello World! 안녕하세요~~!+++수정수정한번더')
)

app.post('/api/users/register', (req, res) => {
  //회원가입할때의 필요한 정보들을 client에서 가져오면 
  //그것들을 데이터에 넣어준다.
  const user = new User(req.body)
  user.save((err, userInfo) =>{
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success: true
    })
  })
  /*
  bodyparser(이 코드에선express) 이용해서 
  (req,body)로 client에서 보내는 정보(id,password등)를 받아준다.
  */ 
})

app.post('/api/users/login', (req, res) =>{
  //로그인 라우터
  /*1.데이터베이스에서 요청한 이메일 찾음
    2.디비에서 요청한 이메일이 있다면 비밀번호가 맞는지 확인
    3.비밀번호까지 같다면 user위한 token생성
  */

    //1.
    User.findOne({email: req.body.email}, (err,user)=>{
      if(!user){
        return res.json({
          loginSuccess: false,
          message: "제공된 이메일에 해당하는 유저가 없습니다."
        })
      }
      //2.
      user.comparePassword(req.body.password, (err, isMatch)=>{
        if(!isMatch)
        return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})
        //3
        user.generateToken((err,user) => {
            if(err) return res.status(400).send(err);
            //토큰을 저장한다. 쿠키 ? 로컬 스토리지 ? 등등
            res.cookie("x_auth", user.token)
            .status(200)
            .json({loginSuccess: true, userId: user._id})
        
      })
      })
    })
})
//role ===0 이면 일반유저, 0이 아니면 관리자
app.get('/api/users/auth', auth, (req,res)=>{
      //여기까지 미들웨어를 통과했다는 예기는 Authentication이 true라는 말
      res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role :req.user.role,
        image : req.user.image
        
      })
})
app.get('/api/hello',(req,res)=>
  res.send("hello world!!~")
)
app.get('/api/users/logout', auth, (req,res)=> {
  //auth 로그인된 상태
  User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err,user) => {
    if(err) return res.json({success: false, err});
    return res.status(200).send({
      success: true
    })
  })
})
  //mongodb+srv://tkddnr313:<password>@boiler-plate.w03wo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
  //nodemon 실시간으로 script변경사항 반영되게끔
app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))
