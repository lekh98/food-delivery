import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login User

const loginUser = async(req,resp)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            resp.json({success:false,message:"user doesnot exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return resp.json({success:false,message:"Invalid credentials"})
        }
        const token = createToken(user._id);
        resp.json({success:true,token})
        
    } catch (error) {
        console.log(error)
        resp.json({success:false,message:"User Doesnot exist"})
    }

}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// register user
const registerUser = async(req,resp)=>{
    const {name,email,password} = req.body
    try {
        // checking user already exist 
        const exist = await userModel.findOne({email})
        if(exist){
            return resp.json({success:false,message:"User Already exist"})
        }
        // validating email format and strong password
        if(!validator.isEmail(email)){
            return resp.json({success:false,message:"please enter valid email"})
        }
        if(password.length<8){
            return resp.json({success:false,message:"please enter a strong password"})
        }
       

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user = await newUser.save();
        const token = createToken(user._id);
        resp.json({success:true,token});
        
    } catch (error) {
        console.log(error);
        resp.json({success:false,message:"Error"});
        
    }

}
export {loginUser,registerUser,createToken}