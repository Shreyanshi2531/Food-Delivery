import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import genToken from "../utils/tokens.js"

export const signUp = async (req, res) => {
    try {
        const {fullName, email, password, mobile, role} = req.body
        const user = await User.findOne({email})
        if (user) {
            return res.status(400).json({message:"User Already Exists."})
        }
        if (password.length<8) {
            return res.status(400).json({message:"Password must be atleast 8 characters long."})
        }
        if (mobile.length =! 10) {
            return res.status(400).json({message:"Mobile Number must be of 10 digits."})
        }

        const hashPass = await bcrypt.hash(password,10)
        user = await User.create({fullName, email, mobile, password:hashPass, role})

        const token = await genToken (user._id)
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000,
            httpOnly: true
        })
        return res.status(201).json(user)
    } catch (error) {
        return res.status(500).json(`Sign Up error ${error}`)
    }
}

export const signIn = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({message:"User does not exist."})
        }   

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({message:"Incorrect Password."})
        }

        const token = await genToken (user._id)
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7*24*60*60*1000,
            httpOnly: true
        })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(`Sign In error ${error}`)
    }
}

export const signOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"Signed Out Successfully."})
    } catch (error) {
        return res.status(500).json(`Sign Out error ${error}`)
    }
}   