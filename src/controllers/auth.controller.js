const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const emailService = require("../services/mail.service")

/**
 * - User register controller
 * - POST /api/auth/register
 */
async function userRegisterController(req, res) {
    const {
        email,
        password,
        name
    } = req.body // ye dala lane ke liye express.json() middelware require hii app.js me 

    //check for user already exists or not 
    const isExists = await userModel.findOne({
        email: email
    })

    if (isExists) {
        return res.status(422).json({
            message: "User already exists with this email.",
            status: "failed"
        })
    }
    //now if all ok then user creation 
    const user = await userModel.create({
        email,
        password,
        name
    })

    //token creation for user staty login 
    const token = jwt.sign({
        userId: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: "3d"
    })

    res.cookie("jwt_token", token)
    res.status(201).json({
        message: "User register successfully.",
        user: {
            _id: user._id,
            Email: user.email,
            name: user.name
        },
        token
    })

    await emailService.sendRegistrationEmail(user.email, user.name)

}

/**
 * -User login controller
 * - POST /api/auth/login
 */
async function userLoginController(req, res) {
    const {
        email,
        password
    } = req.body

    //check for email and pasword 
    const user = await userModel.findOne({
        email
    }).select("+password")

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        })
    }

    const isValidPassword = await user.comparePassword(password)

    if (!isValidPassword) {
        return res.status(401).json({
            message: "Invalid email or passwword"
        })
    }
    //if all clear then token create
    const token = jwt.sign({
        userId: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: "3d"
    })
    res.cookie("jwt_token", token)

    res.status(200).json({
        message: "User login successfully.",
        user: {
            _id: user._id,
            Email: user.email,
            Name: user.name
        },
        token
    })


}

module.exports = {
    userRegisterController,
    userLoginController
}