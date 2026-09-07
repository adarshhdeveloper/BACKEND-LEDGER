const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is require for creating a user"],
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"], //ye email regix hii like email  me kya kya hona chahiye wo   
        unique: [true, "Email already exists"]
    },
    name: {
        type: String,
        required: [true, "Name is required for creating an account"]
    },
    password: {
        type: String,
        required: [true, "Password is required for creating an account"],
        minlength: [6, "Password should be contain more then 6 character"],
        select: false
    },

}, {
    timestamps: true
});

// User password hashing using pre middleware
// Register/create/update ke time password ko hash karega
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;

    return next();
});

/// Login ke time password compare karne ke liye
// true / false return karega
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

//model creation 

const userModle = mongoose.model("user", userSchema)

module.exports = userModle   