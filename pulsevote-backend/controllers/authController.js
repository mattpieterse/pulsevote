const jwt = require('jsonwebtoken');
const User = require('../models/user');

// --- Internal

const generateToken = (id) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: '1d'});
};

// --- Exported

exports.signUp = async function (req, res) {
    const {email, password} = req.body;
    try {
        const alreadyExists = await User.findOne({email});
        if (alreadyExists) {
            return res
                .status(400)
                .json({message: 'Entity already exists'})
        }

        const entity = await User.create({email, password});
        const token = generateToken(entity._id);
        return res
            .status(201)
            .json({token});
    } catch (e) {
        return req
            .status(500)
            .json({error: e.message});
    }
};

exports.signIn = async function (req, res) {
    const {email, password} = req.body;
    try {
        const entity = await User.findOne({email});
        if (!entity || !(await entity.comparePassword(password))) {
            return res
                .status(401)
                .json({message: 'The provided password was incorrect or the user does not exist'});
        }

        const token = generateToken(entity._id);
        return res
            .status(201)
            .json({token});
    } catch (e) {
        return req
            .status(500)
            .json({error: e.message});
    }
};