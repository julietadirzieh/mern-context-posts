import User from "../models/User.js"
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const usuario = await User.findOne({ email });

        if (usuario) {
            return res.json({ message: "User already exists" });
        } else if (!firstName || !lastName || !email || !password) {
            return res.json({ message: "Please fill the required fields!" });
        } else {
            await bcrypt.hash(password, 10, async (error, hashedPassword) => {
                if (error) {
                    return res.json({ error });
                } else {
                    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
                    await newUser.save();
                    return res.json({ message: "User created", newUser });
                }
            });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ message: "User not found" });
        }

        bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) {
                throw new Error(error);
            }

            if (!isMatch) {
                return res.json({ message: "Incorrect password" });
            }

            return res.json({ message: "Login successfull", user });
        });

    } catch (error) {
        return res.json({ error: error.message });
    }
};


export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        if (!user) return res.sendStatus(404)
        return res.json(user)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const updateUser = async (req, res) => {
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
