const express = require("express");
const connectDB = require("./config/database");
const cors = require('cors'); 
require("dotenv").config();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

//parsing data from body  
app.use(express.json());
 
//database connection
connectDB();
 
//import route and mount
const contact = require("./routes/contacts")
app.use("/api/contacts", contact);

const user = require("./routes/user");
app.use("/api/user", user);

app.listen(PORT, ()=>{

    console.log(`Server running on ${PORT}`)
     
})
