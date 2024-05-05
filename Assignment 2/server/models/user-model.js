const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs")
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    irnNumber: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
})


userSchema.pre("save", async function (next) {

    const user = this;
    try {
        const setRound = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(user.password, setRound)
        user.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// compare password 
userSchema.methods.comparePassword = async function (password) {
    return await bcryptjs.compare(password, this.password);

}

const user = new mongoose.model("USER-DATA", userSchema);
module.exports = user;