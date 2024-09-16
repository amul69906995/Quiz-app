const express = require('express')
const router = express.Router()
const catchAsync = require('../error/catchAsync')
const appError = require('../error/appError')
const validateUser = require('../middlewares/validateUser.js')
const axios=require('axios')
router.post('/start-quiz', validateUser, catchAsync(async (req, res) => {
    const { level, subject, numQuestion } = req.body;
    const category = {
        Geography: 22,
        History: 23,
        Science: 24,
    }
    const quiz_api = `${process.env.QUIZ_API}?amount=${numQuestion}&difficulty=${level}&category=${23}&type=multiple`;
    const response = await axios.get(quiz_api);
    console.log(req.body,quiz_api)
    const data=await response.json()
    res.json(data)
}))

module.exports = router;