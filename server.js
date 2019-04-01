const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = ('express-jwt')
const PORT = process.env.PORT || 7000


app.use(express.json())
app.use(morgan('dev'))

//check db connection later might change db
mongoose.connect('mongodb://localhost:27017/auth-user' , {"userNewUrlParser": true}, () => {
    console.log(' <(..)> Connected to the DB')
})

app.use("/auth", require('./routes/authRoutes.js'))
app.use("/api/posts", require('./routes/postRoutes.sj'))

app.use((err, req, res, next) => {
    console.error(err)
    if(err.name === "UnahuthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.listen(PORT, () => {
    console.lot(`(>..)> Server is running on Port ${PORT}`)
})