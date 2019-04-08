const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
const PORT = process.env.PORT || 7000

// const key = require('.env')

// const chatkit = new Chatkit.default({
//     instanceLocator: 'v1:us1:aeb802c1-dbcb-4bd8-9577-fd542318a5f9',
//     key: key
//   });
  
//   app.post('/auth', (req, res) => {
//     const authData = chatkit.authenticate({
//       userId: req.query.user_id
//     });
  
//     res.status(authData.status)
//        .send(authData.body);
//   })

app.use(express.json())
app.use(morgan('dev'))

//check db connection later might change db
mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/auth-user' , {"userNewUrlParser": true}, () => {
    console.log(' <(..)> Connected to the DB')
})

app.use("/auth", require('./routes/authRoutes.js'))
app.use("/public", require('./routes/publicRouter.js'))



app.use("/api", expressJwt({secret: process.env.SECRET}))
app.use("/api/posts", require('./routes/postRoutes.js'))

app.use((err, req, res, next) => {
    console.error(err)
    if(err.name === "UnahuthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.listen(PORT, () => {
    console.log(`(>..)> Server is running on Port ${PORT}`)
})