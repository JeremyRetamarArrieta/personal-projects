const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
    sentMessage:{
        type: String,
        when: Date.now,
    },
    receivedMessage:{
        type: String,
        when: Date.now,
    },
    previousMessages:{
        type: Array,
        when: Date,
    }
})



module.exports = mongoose.model("Chat", chatSchema)