import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async(req, res)=>{

    const {fullName, email, password,role} = req.body;

    if(!email.includes("@") || password.length < 8){
        return res.status(400).json({message:"Invalid input"});
    }

    const userExists= await User.findOne({email});
    if(userExists){
        return res.status(400).json({message:"Email already exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const user= await User.create({
        fullName,
        email,
        password: hashedPassword,
        role
    });

    const token = jwt.sign(
        {id: user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    );

    res.status(201).json({token,user});
};

export const login = async(req,res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user || user.status === "inactive"){
        return res.status(401).json({message:"Invalid credentials"});
    }

    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(401).json({message:"Invalid credentials"});
    }

    user.lastLogin= new Date();
    await user.save();

    const token = jwt.sign(
        { id:user._id,role:user.role},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    );
    res.json({token,user});
}

export const currentUser = async(req,res)=>{
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
}