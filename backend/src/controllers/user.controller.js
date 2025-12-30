import User from "../model/User.js"
import bcrypt from "bcrypt";

export const getAllUser = async(req,res)=>{

    const page = Number(req.query.page) || 1;
    const limit= 10;
    
    const totalUsers = await User.countDocuments();
    const users = await User.find()
    .skip((page - 1) * limit)
    .limit(limit)
    .select("-password");

    res.json({
        users,
        currentPage:page,
        totalPages: Math.ceil(totalUsers / limit),
    });
}

export const activateUser = async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{status:"active"});
    res.json({message:"User activated"});
};

export const deactivateUser = async(req,res)=>{
    await User.findByIdAndUpdate(req.params.id,{status:"inactive"});
    res.json({message:"User deactivated"});
}


export const updateProfile = async(req,res)=>{
    const {fullName,email} = req.body;

    const user = await User.findByIdAndUpdate(
        req.user.id,
        {fullName,email},
        {new: true}
    ).select(-"password");

    res.json(user);
}

export const changePassword = async(req,res)=>{
    const {oldPassword,newPassword} = req.body;
    
    const user = await User.findById(req.user.id);
    const match = await bcrypt.compare(oldPassword,user.password);
    
    if(!match){
        return res.status(400).json({message:"Old password incorrect"});
    }

    user.password = await bcrypt.hash(newPassword,10);
    await user.save();
    res.json({message:"Password updated"});
}


