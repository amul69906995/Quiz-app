const express = require('express')
const router = express.Router()
const catchAsync = require('../error/catchAsync')
const appError = require('../error/appError')
const validateUser = require('../middlewares/validateUser.js')
const axios=require('axios')
const User=require('../models/user.js')
const Question=require('../models/question.js')
const {shuffleArray,validateAnswer}=require('../utils/jsfunctions.js')
const Score=require('../models/score.js')


router.post('/start-quiz', validateUser, catchAsync(async (req, res,next) => {
    const { level, subject, numQuestion } = req.body;
    console.log("userId",req.userId)
    const user=await User.findById(req.userId);
    if(!user)throw new appError("user not found",404);
    const category = {
        geography: 22,
        history: 23,
        science: 24,
    }
    const quiz_api = `${process.env.QUIZ_API}?amount=${numQuestion}&difficulty=${level}&category=${category[subject]}&type=multiple`;
    const {data}= await axios.get(quiz_api);
    data.results.forEach(async (element) => {
       // console.log(element)
        const newQuestion=new Question(
            {
                owner:user._id,
               difficulty:element.difficulty,
               category:element.category,
               question:element.question,
               correct_answer:element.correct_answer,
               incorrect_answers:element.incorrect_answers
        });
      const savedQuestion= await newQuestion.save();
      console.log("saved questions",savedQuestion)
    });
    next();
}),catchAsync(async(req,res,next)=>{
    const question=await Question.find({owner:req.userId})
    console.log("inside here",question)
    const newQuestion=question.map(q=>{
        const options=[...q.incorrect_answers,q.correct_answer];
        const shuffledOptions=shuffleArray(options);
        console.log(options)
        return ({
            question:q.question,
            difficulty:q.difficulty,
            category:q.category,
            options:shuffledOptions
        })
    })
    res.json(newQuestion)
}))
router.post('/submit',validateUser,catchAsync(async(req,res)=>{
const {answer}=req.body;
//console.log(req.userId)
const correct_answer = await Question.find({ owner: req.userId }).select('correct_answer');
//console.log(correct_answer);
const obj=validateAnswer(answer,correct_answer);
const newScore=new Score({owner:req.userId,correctQuestion:obj.correct,attemptedQuestion:obj.attempted,unattemptedQuestion:obj.unattempted});
await newScore.save();
const deleteQuestion=await Question.deleteMany({owner:req.userId});
res.json(obj)
}))
router.get('/all-score',validateUser,catchAsync(async(req,res)=>{
    const score=await Score.find({owner:req.userId}).sort({ createdAt: -1 });
    res.json(score);
}))
module.exports = router;
