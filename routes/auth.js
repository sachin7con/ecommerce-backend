import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";


const router = express.Router();

//Register
router.post("/register", async (req, res) => {
    const {email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email, 
        password: hashedPassword,
    })

    res.json(user)
})
//Login
router.post("/login", async(req, res) =>{
    const { email, password } = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(400).json("User not found");

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return res.status(400).json("Invalid credentials");

    const token = jwt.sign(
        {id: user._id, email: user.email },
        "secretkey",
        {expiresIn: "1d"}
    )
    
    res.json({message: "Login Successfull", token});
})



export default router;