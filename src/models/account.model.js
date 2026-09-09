const mongoose = require("mongoose")

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: [true, "Account must be associated with a user"],
        index: true //used for searching an user it use B+ tree DS for Seaching 
    },
    status: {
        type: String,
        enum: {
            values: ["ACTIVE", "FROZEN", "CLOSED"],
            message: "Status can be either ACTIVE, FROZEN or CLOSED",
        },
        default: "ACTIVE"
    },
    /*  Balance will be store in cache */
    currency: {
        type: String,
        required: [true, "Currency is required for creating an account"],
        default: "INR"
    },

}, {
    timestamps: true
})

//compound index
accountSchema.index({
    user: 1,
    status: 1
})

const accountModel = mongoose.model("account", accountSchema)

module.exports = accountModel