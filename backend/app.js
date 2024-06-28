const express=require('express')
const app=express()
require('dotenv').config()

//parser
app.use(express.json())
app.use(express.urlencoded({extended:true}))



//database connection
const mongoose = require('mongoose');



async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  
}


main()
.then(()=>{console.log("database connected")})
.catch(err =>{ 
  console.log(err)
  console.log(process.env.MONGO_URI)
}
);


//cors 
var cors = require('cors')
app.use(cors({
  origin:"http://localhost:5173"
}))




//route
app.get('/',(req,res)=>{
    res.json('hello from backend and cors configured')
})

//error



app.listen(process.env.port,()=>{console.log(`server started on port ${process.env.port}`)})