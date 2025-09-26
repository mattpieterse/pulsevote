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

const requireRole = (role) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.user.id);
            if (!user) return res.status(401).json({message: "User not found"});

            if (role === "admin") {
                const isAdmin = user.roles.some(r => r.role === "admin");
                if (!isAdmin) return res.status(403).json({message: "Forbidden"});
                return next();
            }

            const orgId = req.params.organisationId || req.body.organisationId;

            const hasRole = user.roles.some(r =>
                r.role === role && (!orgId || r.organisationId?.toString() === orgId)
            );

            if (!hasRole && !user.roles.some(r => r.role === "admin")) {
                return res.status(403).json({message: "Forbidden"});
            }

            next();
        } catch (e) {
            res.status(500).json({error: e});
        }
    };
};

// --- Exported

module.exports = {requireToken};
module.exports = {requireRole};