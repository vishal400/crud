const User = require("../models/User");

// controllers for user endpoints
module.exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        // console.log(users);
        res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

module.exports.getUserByID = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        // console.log(user);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.createUser = async (req, res) => {
    const { user, interest, age, mobile, email } = req.body;
    const newUser = new User({ user, interest, age, mobile, email });
    try {
        const savedUser = await newUser.save();
        // console.log(savedUser);
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports.editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { user, interest, age, mobile, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { user, interest, age, mobile, email },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}