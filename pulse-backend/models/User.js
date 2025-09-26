const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// --- Internal

const roleSchema = new mongoose.Schema({
    organisationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organisation"
    },
    role: {
        type: String,
        enum: ["admin", "manager", "user"],
        required: true
    }
}, {
    _id: false
});

const schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [roleSchema]
});

schema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

schema.methods.comparePassword = function (candidate) {
    return bcrypt.compare(candidate, this.password);
};

// --- Exported

module.exports = mongoose.models.User || mongoose.model('User', schema);