const mongoose = require("mongoose");
require("dotenv").config();

    const connectDB = () =>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology:  true,
    })
    .then(() => {
        console.log("Database connection successful")
    })
    .catch((error) =>{
        console.log("Database connection failed");
        console.error(error);
        process.exit(1);
    })
} 

module.exports = connectDB;
