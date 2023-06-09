import { JWT_SECRET } from "../config.js";
import User from "../models/User.js";
import { signJwt } from '../utils/jwtUtil.js';

import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            const newUser = new User({ username, email });
            const hashedPassword = await newUser.encryptPassword(password);

            if (!hashedPassword) {
                return res.json({
                    auth: false,
                    message: "Not possible to register the user"
                });
            }

            newUser.password = hashedPassword;
            await newUser.save();

            const token = signJwt(newUser);

            return res.json({ auth: true, message: "User created", user: { ...newUser._doc, token } });
        }

        return res.json({ message: "User already exists" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const registeredUser = await User.findOne({ email });

        if (!registeredUser) {
            return res.json({
                auth: false,
                message: "User not found"
            })
        }

        const validPassword = await registeredUser.comparePassword(password, registeredUser.password);

        const token = signJwt(registeredUser)

        if (!validPassword) {
            return res.json({
                auth: false,
                message: "Invalid user or password"
            })
        }
        return res.json({ auth: true, message: "Login succesful!", user: { ...registeredUser._doc, token } });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getUserById = async (req, res) => {
    try {
        const token = req.headers["authorization"]

        if (!token) {
            return res.status(401).json({
                auth: false,
                message: "No token provided"
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.id, { password: 0 });
        if (!user) {
            return res.sendStatus(404).send("No user found");
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};




/* export const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
        return res.send(updatedUser)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const userRemoved = await User.findByIdAndDelete(req.params.userId)
        if (!userRemoved) return res.sendStatus(404)

        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
 */