const mongoose = require('mongoose');
const User = require('./userSchema');

const schema = new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: User,
        required : true,
        
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId ,
        ref: User,
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

    schema.index ( { fromUserId:1 , toUserId:1})
    const Connection = new mongoose.model( "Connection" , schema)

    module.exports = Connection; 