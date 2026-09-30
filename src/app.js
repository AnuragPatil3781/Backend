import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

// Test route
app.get("/api/v1/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Backend is running"
    });
});

// Register
app.post("/api/v1/users/register", (req, res) => {
    const { fullName, email, username, password } = req.body;

    if (!fullName || !email || !username || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    const existingUser = users.find(
        user => user.email === email || user.username === username
    );

    if (existingUser) {
        return res.status(409).json({
            success: false,
            message: "User already exists"
        });
    }

    const user = {
        id: users.length + 1,
        fullName,
        email,
        username,
        password
    };

    users.push(user);

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            username: user.username
        }
    });
});

// Login
app.post("/api/v1/users/login", (req, res) => {
    const { email, username, password } = req.body;

    const user = users.find(
        user =>
            (user.email === email || user.username === username) &&
            user.password === password
    );

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid credentials"
        });
    }

    res.status(200).json({
        success: true,
        message: "Login successful",
        user: {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            username: user.username
        }
    });
});

// Logout
app.post("/api/v1/users/logout", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Logout successful"
    });
});

export { app };