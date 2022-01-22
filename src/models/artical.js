

const mongoose = require('mongoose')

const articalSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true   
    },
    description:{
        type:String,
        required:true,
        trim:true
    },

    reporter:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Journalist'
    }
})

const Artical = mongoose.model('Artical',articalSchema)
module.exports = Artical