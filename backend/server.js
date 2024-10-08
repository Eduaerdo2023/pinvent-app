const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const userRoute = require('./routes/userRoute')
const app = express()
const errorHandler = require('./middleware/errorMiddleware.js')
// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())

// Routes Middleware
app.use('/api/users', userRoute)

//Routes
app.get('/', (req, res)=>{
  res.send('hello')
})

const PORT = process.env.PORT || 5000
// Error MIddleware
app.use(errorHandler)
// Connect to DB start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));