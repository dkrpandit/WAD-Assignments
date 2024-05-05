const user = require("../models/user-model");
const userModel = require("../models/user-model");
// Create
const register = async (req, res) => {
    try {
        const data = req.body;
        console.log(data);

        const existingUser = await user.findOne({
            $or: [{ email: data.email }, { irnNumber: data.irnNumber }]
        });

        if (existingUser) {
            const isEmailConflict = existingUser.email === data.email;
            const message = isEmailConflict
                ? "Email is already in use"
                : "irnNumber is already taken";
            res.status(400).json({ message });
        } else {
            const createUser = await user.create({
                name: data.name,
                irnNumber: data.irnNumber,
                email: data.email,
                password: data.password,
            });

            res.status(201).json({
                msg: "Registration successful",
            });
        }
    } catch (error) {
        console.log("Error during registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


// login the user
const login = async (req, res) => {
    try {
        const data = req.body;
        const userExist = await user.findOne({
            $or: [
                { email: data.irnNumberOrEmail },
                { irnNumber: data.irnNumberOrEmail }
            ]
        });

        if (!userExist) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await userExist.comparePassword(data.password);

        if (isPasswordValid) {
            res.status(200).json({
                message: "Login successful",
            });
        } else {
            res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.log("Error during login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


// get all registered users 


// read
const getUsers = async (req, res) => {
    try {
        const response = await userModel.find({}, { password: 0 });
        if (!response) {
            return res.status(404).json({ message: "errors to load users" })
        }
        return res.status(200).json(response)
    } catch (error) {
        console.log(`errors ${error}`);
    }
}



// Delete user
const deleteUser = async (req, res) => {
    try {
        const { email, irnNumber } = req.body;

        // Check if either email or irnNumber is provided
        if (!email && !irnNumber) {
            return res.status(400).json({ message: "Email or IRN number is required" });
        }

        // Find the user by email or irnNumber
        const existingUser = await userModel.findOne({
            $or: [{ email }, { irnNumber }]
        });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Delete the user
        await existingUser.deleteOne();

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(`Errors: ${error}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateUser = async (req, res) => {
    const { email, irnNumber } = req.body;

    // Check if either email or irnNumber is provided
    if (!email && !irnNumber) {
        return res.status(400).json({ message: "Email or IRN number is required" });
    }

    try {
        // Find the user by email or irnNumber
        const existingUser = await userModel.findOne({
            $or: [{ email }, { irnNumber }]
        });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the name if provided in the request body
        if (req.body.name) {
            existingUser.name = req.body.name;
            await existingUser.save();
            return res.status(200).json({ message: "Name updated successfully" });
        } else {
            return res.status(400).json({ message: "Name field is required for update" });
        }
    } catch (error) {
        console.error("Error updating name:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { register, login, getUsers, deleteUser ,updateUser};
