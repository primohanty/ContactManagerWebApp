const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); 
require("dotenv").config();


//User Register
const userRegister = async (req, res) =>{
    try{
        const {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({
                success:false,
                message: "All data fields are required"
            })
        }

        const existingUser = await User.findOne({email});
        
        if(existingUser){
            return res.status(400).json({
                success:false,
                message: "User is already registered"
            })
        }

        //secure password
        let hashedPassword;

        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }catch(error){
            return res.status(500).json({
                success:false,
                message: "Password could not be hashed"
            })
        }

        //create entry of new user
        const newUser = await User.create({
            username,
            email,
            password:hashedPassword,
        })

        res.status(200).json({
            success:true,
            message:"User Registerd Successfully",
        })


    }catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be Registered",
        })
    }
}


//User Login 
const userLogin = async (req, res) =>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All data fields are required"
            })
        }

        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not Registered"
            })
        }

        const payload = {
            username: user.username,
            email:user.email,
            id:user._id,
        }

        //verify password and generate JWT Token
        if(await bcrypt.compare(password, user.password)){
            let token = jwt.sign(payload, process.env.JWT_SECRET,
                                        {
                                            expiresIn:"2h",
                                        })
            
       
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true
            }

            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message: "User Logged In Successful"
            })
           

        }
        else{
            return res.status(403).json({
                success:false,
                message:"Invalid Password"
            })
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"User Login Failed"
        })
    }
}

const currentUserInfo = async (req, res) =>{
    try{
        res.status(200).json({
            user: req.user,
            success: true,
            message: "User Info fetched successfully",
        })
    }catch(error){
        res.status(400).json({
            success: false,
            message: "User Info cannot be fetched"
        })
    }
}

module.exports = {userRegister, userLogin, currentUserInfo};
