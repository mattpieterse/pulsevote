const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const authRoutes = require("./routes/authRoutes");
const {requireToken} = require("./middleware/authMiddleware");

// --- Internal

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));

app.get('/', (req, res) => {
    res.send('API Operational');
});

app.get('/author', (req, res) => {
    res.json({
        author: "Matthew Pieterse",
        github: "https://github.com/mattpieterse"
    });
});

app.get("/api/protected", requireToken, (req, res) => {
    res.json({
        message: `${req.user.id} successfully entered a secured endpoint.`,
        timestamp: new Date()
    });
});

app.use("/api/auth", authRoutes);

// --- Exported

module.exports = app;