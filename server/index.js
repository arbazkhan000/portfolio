import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/config/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
    cors({
        origin: process.env.CLIENT_URL || "https://portfolio-14-xi.vercel.app/",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static("uploads"));

//import routes
import adminRoutes from "./src/routes/adminRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";

// use Routes
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/auth", adminRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to Portfolio Api");
});

// Start server after DB connection

const ServerStart = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

ServerStart();
