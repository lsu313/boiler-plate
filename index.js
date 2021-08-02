//back-end 시작점
const express = require('express')
const app = express()
const port = 5000
const {User} = require("./models/User");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://tkddnr313:dltkddnrcjs7@boiler-plate.w03wo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
  useNewurlParser: true, useUnifiedTopology: true, useCreateIndex: true,useFindAndModify : false
}).then(() => console.log('mongoDB connected...'))
  .catch(err => console.log(err))

  app.get('/', (req, res) => 
  res.send('Hello World! 안녕하세요~~!')
)

app.post('/register', (req, res) => {
  //회원가입할때의 필요한 정보들을 client에서 가져오면 
  //그것들을 데이터에 넣어준다.
  const User = new User(req, body)
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
  //mongodb+srv://tkddnr313:<password>@boiler-plate.w03wo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))
