const cron = require("node-cron") ;
const Connection = require("../models/connectionRequestSchema");
const { subDays, startOfDay , endOfDay} = require(date-fns)


cron.schedule( "0 8 * * *" , async () => {
     
    console.log("Run every day 8am")
    // send an email to all people who got friend request yesterday
    // try{

    //     const yesterday= subDays( new Date() , 1)
    //     const yesterdayStart = startOfDay( yesterday )
    //     const yesterdayEnd = endOfDay( yesterday )

    //     const pendingRequest = await Connection.findA( 
    //         {
    //             status :"interested" ,
    //             createdAt :{
    //                 $ge : yesterdayStart,
    //                 $le : yesterdayEnd  
    //             }
    //         }
    //     ).populate("fromUserId toUserId")

    //     const listOfEmail = [... new Set(pendingRequest.map( row => row.toUserId.email) ) ]

    //     //find pending connection request , statud interseted , created At 
    // }
    // catch(err){

    // }
})