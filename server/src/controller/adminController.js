import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../schema/userSchema.js";

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

const AdminController = {
    // @desc    Register user
    // @route   POST /api/v1/auth/register
    // @access  Public
    adminRegister: async (req, res) => {
        const { username, password } = req.body;

        try {
            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required",
                });
            }

            // Check for user
            const user = await User.findOne({ username });
            if (user) {
                return res.status(400).json({
                    success: false,
                    message: "User already exists!",
                });
            }

            const hashPassword = await bcrypt.hash(password, 10); // Increased salt rounds for better security

            // Create user
            const newUser = await User.create({
                username: username,
                password: hashPassword,
            });

            res.status(201).json({
                // Changed to 201 for resource creation
                success: true,
                message: "User registered successfully",
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    role: newUser.role, 
                },
                // token: generateToken({ id: username }),
            });
        } catch (err) {
            console.error("Registration error:", err);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: err.message,
            });
        }
    },

    adminLogin: async (req, res) => {
        const { username, password } = req.body;
        try {
            // Validate username & password
            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    message: "All fields are required",
                });
            }

            // Check for user
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials", 
                });
            }

            // Check if password matches
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid credentials",
                });
            }

            res.status(200).json({
                success: true,
                message: "User logged in successfully",
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                },
            });
        } catch (err) {
            console.error("Login error:", err);
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: err.message,
            });
        }
    },
};

export default AdminController;
