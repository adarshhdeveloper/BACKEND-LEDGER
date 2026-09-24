const accountModel = require("../models/account.model")

async function createUsercontroller(req,res){
    const user = req.user
    
    const account = await accountModel.create({
        user : user._id
    })
    res.status(201).json({
        message:"Account has been created ",
        account
    })
    
}

module.exports = {
    createUsercontroller
}