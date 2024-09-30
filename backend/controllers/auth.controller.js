const Doctor = require("../models/doctor.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError.js");
const { sendBusinessMessage } = require('../utils/messageService');

const register = async (req, res, next) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 5);
        const newDoctor = new Doctor({
            ...req.body,
            password: hash,
        });
        
        await newDoctor.save();
        await sendBusinessMessage(`New doctor registered: ${newDoctor.name}`);
        res.status(201).send("User has been created");
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const doctor = await Doctor.findOne({ email: req.body.email });
        if (!doctor) return next(createError(404, "User not found!"));

        const isCorrect = bcrypt.compareSync(req.body.password, doctor.password);
        if (!isCorrect) return next(createError(400, "Wrong password or username!"));

        const token = jwt.sign({
            id: doctor._id,
        }, process.env.JWT_KEY, { expiresIn: '1h' });

        const { password, ...info } = doctor._doc;
        res.cookie("accessToken", token, {
            httpOnly: true, // доступні тільки для серверних запитів, це підвищує безпеку
            secure: process.env.NODE_ENV === "production", 
            maxAge: 3600000, // Час життя (1 година)
        })
        .status(200)
        .send(info);

        await sendBusinessMessage(`Doctor logged in: ${doctor.name}`);

    } catch (error) {
        next(error);
    }
};

const logout = async (req, res) => {
    res
    .clearCookie("accessToken", {
        sameSite: "none",
        secure: true,
    })

    await sendBusinessMessage(`Doctor logged out: ${req.user.name}`)
    .status(200)
    .send("User has been logged out.");
};

module.exports = { register, login, logout }