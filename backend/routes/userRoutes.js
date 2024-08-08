const express = require("express");
const router = express.Router();
const { getUsers, getUserByID, createUser, editUser } = require("../controllers/UserController");

// Get all users
router.get("/", getUsers);

// Get user by ID
router.get("/:id", getUserByID);

// Create new user
router.post("/", createUser);

// Update user by ID
router.put("/:id", editUser);

module.exports = router;
