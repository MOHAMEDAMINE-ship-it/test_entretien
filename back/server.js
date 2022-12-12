const express = require("express")
const mongoose=require('mongoose')
const cors=require('cors')





require('dotenv').config()
const authRoute=require('./routes/auth')
const todoRoute=require('./routes/todo')

const app = express()
const port=process.env.PORT || 4500
app.use(cors())

 app.use(express.json());

 const url=process.env.ATLAS_URI
 mongoose.connect(url,{ useNewUrlParser: true })
 const connection=mongoose.connection;
 connection.once('open', () => {
    console.log("MongoDB database connection established successfully"+port);
  })
  app.use('/api/v1',authRoute)
  app.use('/api/v2',todoRoute)



app.listen(port, () => {
	console.log(`Server has started!":${port}`)
})