import usersManager from "../data/fs/users.en.js";
import isValidUser from "../middlewares/isValidUser.mid.js"; // Import the middleware

// Function to create a user
const createUser = async (req, res, next) => {
  try {
    const newUser = await usersManager.create(req.body);
    return res.status(201).json({ response: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    next(error);
  }
};

// Function to read a user
const readOneUser = async (req, res, next) => {
  const { uid } = req.params;
  try {
    const user = await usersManager.readOne(uid);
    if (user) {
      return res.status(200).json({ response: user });
    }
    return res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.error("Error fetching user:", error);
    next(error);
  }
};

// Function to read all users
const readUsers = async (req, res, next) => {
  try {
    const { role } = req.query;
    const users = await usersManager.readAll(role);
    if (users.length > 0) {
      return res.status(200).json({ response: users });
    }
    return res.status(404).json({ error: "No users found" });
  } catch (error) {
    console.error("Error fetching users:", error);
    next(error);
  }
};

// Function to update a user
const updateUser = async (req, res, next) => {
  const { uid } = req.params;
  try {
    const updated = await usersManager.update(uid, req.body);
    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ response: updated });
  } catch (error) {
    console.error("Error updating user:", error);
    next(error);
  }
};

// Function to delete a user
const deleteUser = async (req, res, next) => {
  const { uid } = req.params;
  try {
    const deleted = await usersManager.delete(uid);
    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(204).end();
  } catch (error) {
    console.error("Error deleting user:", error);
    next(error);
  }
};

export { createUser, readOneUser, readUsers, updateUser, deleteUser };
