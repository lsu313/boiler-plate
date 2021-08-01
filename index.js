//back-end 시작점
const express = require('express')
const app = express()
const port = 5000

app.get('/', (req, res) => 
  res.send('Hello World! 안녕하세요~~!')
)
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://tkddnr313:dltkddnrcjs7@boiler-plate.w03wo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
  useNewurlParser: true, useUnifiedTopology: true, useCreateIndex: true,useFindAndModify : false
}).then(() => console.log('mongoDB connected...'))
  .catch(err => console.log(err))


  //mongodb+srv://tkddnr313:<password>@boiler-plate.w03wo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})