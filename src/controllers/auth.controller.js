const userModle = require("../models/user.model")

/**
 * - user register controller
 * - POST /api/auth/register
 */
async function userRegisterController(req, res) {
    const {
        email,
        password,
        name
    } = req.body // ye dala lane ke liye express.json() middelware require hii app.js me 

    //check for user already exists or not 
    const isExists = await userModle.findOne({
        email: email
    })

    if (isExists) {
        return res.status(422).json({
            message: "User already exists with this email.",
            status: "failed"
        })
    }
    //now if all ok then user creation 
    const user = await userModle.create({
        email,
        password,
        name
    })
    
    //token creation for user staty login 
    

}

module.exports = {
    userRegisterController
}