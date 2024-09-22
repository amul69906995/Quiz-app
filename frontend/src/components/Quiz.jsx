import React, { useContext, useState, useEffect } from 'react';
import { questionContext } from '../context/QuestionProvider';
import Option from './Option';
import './quiz.css'; // Import the CSS file for styling
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
const Quiz = () => {
  const { question } = useContext(questionContext);
  const navigate=useNavigate();
  const [answer, setAnswer] = useState([]);
  const [timerSecond,setTimerSecond]=useState(120)
  const handleAnswer = (index, value) => {
    const newAnswer = [...answer];
    newAnswer[index] = value;
    setAnswer(newAnswer);
   // console.log("Updated answers:", newAnswer);
  };
const handleSubmit=async()=>{
  try {

    const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/quiz/submit`,{answer},
      {withCredentials:true} );
      navigate('/protected/score');
  } catch (error) {
    console.log(error)
  }
}
  useEffect(() => {
    if (question.length > 0) {
      setAnswer(new Array(question.length).fill(null));
    }
       const timer=setInterval(()=>{
        
        setTimerSecond((prev) => {

          if (prev === 0) {
            clearInterval(timer); 
            handleSubmit(); 
          }
          return prev > 0 ? prev - 1 : 0; 
        });
      }, 1000);
    
    return ()=>{clearTimeout(timer)}
    
  }, [question]);
  return (
    <>
      <div className="quiz-container">
      <span>{`${String(parseInt(timerSecond / 60)).padStart(2, '0')}:${String(timerSecond % 60).padStart(2, '0')}`}</span>

        {question.length > 0 && question.map((q, idx) => (
          <div key={idx} className="question-block">
            <li className="question">{q.question}</li>
            <Option options={q.options} handleAnswer={handleAnswer} idx={idx} answer={answer} />
          </div>
        ))}
        <button className="submit-btn" onClick={handleSubmit} disabled={timerSecond==0}>Submit</button>
      </div>
    </>
  );
};

export default Quiz;

