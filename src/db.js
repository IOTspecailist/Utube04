import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/utube04",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    //useFindAndModify:false,
});

const db = mongoose.connection;
const handleOpen=()=> {
    console.log("!!!!Connected to DB!!!!");
    console.log("db:",db.name);   
    console.log("db collection:",db.collection.length);
}
const handleError=(error)=>console.log("NO!! DB Error!!!",error);

db.on("error",handleError);
db.once("open",handleOpen);