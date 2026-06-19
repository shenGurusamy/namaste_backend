const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://rjpmpandian:Wish6606@cluster0.h5sm4.mongodb.net/"


const client = new MongoClient(uri);
const dbName = "nodejs"
const collectionName = "firstproj"

async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB Connected");
    const db = client.db(dbName)
    const collection = db.collection( collectionName )
    //const insert = await collection.insertMany( [{ firstName:"second" , lastName :"secondLast" , age:40,  } , { firstName:"shen" , lastName :"gurusamy" , age:44,  } ])
    //const deleteOne = await collection.deleteMany({ firstName :"second"}  );
    //console.log('Updated documents =>', deleteOne);
    const count = await collection.countDocuments({})
    
    //const findAll = await collection.find({}).toArray()
    console.log( count  )

    return "done.."
  } catch (err) {
    console.error(err);
  }
}

connectDB();
 