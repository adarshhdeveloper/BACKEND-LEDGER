const express = require("express")
    
const router = express()

router.post("/register",authrouter)

module.exports= router