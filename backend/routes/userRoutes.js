const express = require('express')
const router = express.Router()
const catchAsync = require('../error/catchAsync')
const appError = require('../error/appError')
const User = require('../models/user.js')
const validateUserSchema = require('../utils/validateUserSchema.js')
const jwt = require('jsonwebtoken')
const sendVerificationEmail = require('../utils/sendVerificationEmail.js')



router.post('/sign-in', catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    const { error } = await validateUserSchema.validateAsync(req.body)
    if (error) throw new appError(error.details[0].message, 400)
    const emailExists = await User.findOne({ email })
    if (emailExists) throw new appError("email already exist", 400)
    const user = new User({ email, password })
    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    const verifyUrl = `${process.env.FRONTEND_URL}/emailverification/?token=${jwtToken}`
    await sendVerificationEmail(verifyUrl)
    await user.save()
    // res.json({ jwtToken, verifyUrl })
    res.json({ "message": "please verify you email then login" })
}))
router.post('/log-in', catchAsync(async (req, res, next) => {
    const logic = async () => {
        const { email, password } = req.body;
        const { error } = await validateUserSchema.validateAsync({ email, password })
        if (error) throw new appError(error.details[0].message, 400);
        const user = await User.findOne({ email })
        if (!user) throw new appError("email doenot exist", 400)
        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) throw new appError("password is incorrect", 400)
        if (!user.isVerified) throw new appError("user is not verified", 400)
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.cookie('jwtToken', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
        res.json({ "message": "login successfully", jwtToken, user })
    }
    const { jwtToken } = req.cookies;
    if (jwtToken) {
        jwt.verify(jwtToken, process.env.JWT_SECRET, function (err, data) {
            if (data) throw new appError('you already have token no need to login again', 400)
            if (err) {
                logic()
            }
        });
    }
    else {
        await logic();
    }

}))

router.post('/verify-user', catchAsync(async (req, res, next) => {
    const { token } = req.body;
    if (!token) throw new appError("jwt is required", 400)
    const data = jwt.verify(token, process.env.JWT_SECRET)
    if (!data) throw new appError("token is invalid", 400)
    const user = await User.findById(data.id)
    if (!user) throw new appError('token is expired/invalid token', 400)
    if (user.isVerified) throw new appError('user already verified', 400)
    user.isVerified = true;
    await user.save()
    res.json({ message: "user is verified", user })
}))







module.exports = router;