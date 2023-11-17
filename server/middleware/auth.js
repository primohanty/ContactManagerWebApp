const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try{
        //extract the jwt
        //TODO extract the token from header
        const token = req.header("Authorization").replace("Bearer ","");
        
        if(!token || token===undefined){
            return res.status(401).json({
                success:false,
                message:"Token is Missing"
            })
        }

        //verify the token 
        try{

            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode;
            

        } catch(error){
            return res.status(401).json({
                success:false,
                message:"Token is Invalid"
            })
        }
        
        next();

    } catch(error){
        console.log("Error in User authentication",error);
        return res.status(401).json({
            success: false,
            message: "User Authentication failed"
        })
    }
}
