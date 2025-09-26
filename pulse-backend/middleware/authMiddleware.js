const jwt = require("jsonwebtoken");

// --- Internal

const requireToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
            .status(401)
            .json({message: "Unauthorized"});
    }

    const token = authHeader.split(" ")[1];
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) {
        return res
            .status(403)
            .json({
                message: "Token invalid or expired",
                error: e
            });
    }
};

// --- Exported

module.exports = {requireToken};