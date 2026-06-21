const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required : true
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId ,
        required : true
    },
    status:{
        type:String,
        required : true,
        enum:{
            values : ["interested","ignored","rejected", "accepted"],
            message : `{value} is not supported`
        }
    },
    })

    const Connection = new mongoose.model( "Connection" , schema)

    module.exports = Connection; 