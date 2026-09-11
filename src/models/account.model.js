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

//function for fetch balance *****************************************************************
accountSchema.method.getBlance = async function() {
    accountSchema.methods.getBalance = async function() {

        const balanceData = await ledgerModel.aggregate([{
                $match: {
                    account: this._id
                }
            },
            {
                $group: {
                    _id: null,
                    totalDebit: {
                        $sum: {
                            $cond: [{
                                    $eq: ["$type", "DEBIT"]
                                },
                                "$amount",
                                0
                            ]
                        }
                    },
                    totalCredit: {
                        $sum: {
                            $cond: [{
                                    $eq: ["$type", "CREDIT"]
                                },
                                "$amount",
                                0
                            ]
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    balance: {
                        $subtract: ["$totalCredit", "$totalDebit"]
                    }
                }
            }
        ])

        if (balanceData.length === 0) {
            return 0
        }

        return balanceData[0].balance

    }


}


const accountModel = mongoose.model("account", accountSchema)

module.exports = accountModel