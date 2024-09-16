const express = require('express')
const app = express()
require('dotenv').config()
const userRoutes=require('./routes/userRoutes')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const quizRoutes=require('./routes/quizRoutes.js')
//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//cookieParser
app.use(cookieParser())

//database connection
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}
main()
  .then(() => { console.log("database connected") })
  .catch(err => {
    console.log(err)
    console.log(process.env.MONGO_URI)
  }
  );
//cors  
//NOTE::::: add withCredentials when u set cookies in response
var cors = require('cors')
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
// morgan req logger

app.use(morgan('tiny'))


app.use('/user',userRoutes)
app.use('/quiz',quizRoutes)
//error
app.use((err, req, res, next) => {
  const { message = "something went wrong/default message to debug u have to dig dipper", statusCode = 500 } = err
  console.log("**********error**************")
  console.log("**********error**************")
  console.log(err)
  console.log("**********error**************")
  res.status(statusCode).json({ message })
})

app.listen(process.env.PORT||3003, () => { console.log(`server started on port ${process.env.PORT}`) })