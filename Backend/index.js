const express = require("express");
require('dotenv').config();
const cors = require("cors");
const connection = require("./config/db");
const movieRoutes = require('./routes/movies.route');

const app = express();
app.use(express.json());
app.use(cors());

// Home route
app.get("/", (req, res) => {
    res.send("Home page");
});

// Use movie routes
app.use('/movies', movieRoutes);

// Start server
const PORT = process.env.PORT ;
app.listen(PORT, async () => {
    try {
        await connection;
        console.log("DB connected");
    } catch (err) {
        console.error("Database connection error:", err.message);
        process.exit(1); // Exit the process with failure
    }
    console.log(`Listening on port ${PORT}`);
});
