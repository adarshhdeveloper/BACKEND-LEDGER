const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const accountController = require("../controllers/account.controller")


const router = express.Router()

/**
 * - POST/api/accounts/createUserAccount
 * - Create a new account 
 * - Protected route 
 */
router.post("/", authMiddleware.authMiddleware, accountController.createUsercontroller)

module.exports = router