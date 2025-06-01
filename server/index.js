import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./src/config/db.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


const corsOptions = {
    origin: function (origin, callback) {
       
        if (!origin) return callback(null, true);
        
        const allowedOrigins = [
            'https://arbazconnect.vercel.app',
            'http://localhost:5173',
        ];
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('Blocked by CORS for origin:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'Authorization',
        'Cache-Control',
        'Pragma'
    ],
    optionsSuccessStatus: 200 
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests explicitly
app.options('*', cors(corsOptions));

// Other middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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

// Add a test endpoint to verify API is working
app.get("/api/v1/health", (req, res) => {
    res.json({ 
        message: "API is working!", 
        timestamp: new Date().toISOString(),
        cors: "Configured for https://arbazconnect.vercel.app",
        environment: process.env.NODE_ENV || 'development'
    });
});

// Add CORS test endpoint
app.get("/api/v1/cors-test", (req, res) => {
    res.json({
        message: "CORS is working!",
        origin: req.headers.origin,
        timestamp: new Date().toISOString()
    });
});

// Start server after DB connection
const ServerStart = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`CORS configured for: https://arbazconnect.vercel.app`);
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

ServerStart();