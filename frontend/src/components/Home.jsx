import React, { useContext, useState } from 'react';
import './home.css'; // Import the CSS file
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { questionContext } from '../context/QuestionProvider';
const Home = () => {
  const [level, setLevel] = useState('easy');
  const [subject, setSubject] = useState('');
  const [numQuestion, setNumQuestion] = useState('');
  const [errors, setErrors] = useState({ subject: '', numQuestion: '' });
  const navigate=useNavigate();
  const {setQuestion}=useContext(questionContext);
  const handleStartQuiz = () => {
    let errorMessages = { subject: '', numQuestion: '' };
    let hasErrors = false;

    if (!subject) {
      errorMessages.subject = "Please select a subject.";
      hasErrors = true;
    }

    if (numQuestion < 1 || numQuestion > 15) {
      errorMessages.numQuestion = "Please enter a number of questions between 1 and 15.";
      hasErrors = true;
    }

    if (hasErrors) {
      setErrors(errorMessages);
    } else {
      // Reset errors
      setErrors({ subject: '', numQuestion: '' });
      // Call API to start quiz
      startQuiz();
       navigate('/protected/quiz')
    }
  };
  const startQuiz = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/quiz/start-quiz`, { level, subject, numQuestion }, {
        withCredentials: true
      })
     console.log(data)
     setQuestion(data)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="quiz-container">
      <h3>Select a subject and level to start the quiz</h3>

      {/* Level Selector */}
      <div className="level-selector">
        <label htmlFor="level">Select Level:</label>
        <select
          name="level"
          id="level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Subject Selector */}
      <div className="subject-selector">
        <label>
          <input
            type="radio"
            name="subject"
            value="history"
            checked={subject === 'history'}
            onChange={(e) => setSubject(e.target.value)}
          />
          History
        </label>

        <label>
          <input
            type="radio"
            name="subject"
            value="science"
            checked={subject === 'science'}
            onChange={(e) => setSubject(e.target.value)}
          />
          Science
        </label>

        <label>
          <input
            type="radio"
            name="subject"
            value="geography"
            checked={subject === 'geography'}
            onChange={(e) => setSubject(e.target.value)}
          />
          Geography
        </label>
        {errors.subject && <p className="error-text">{errors.subject}</p>}
      </div>

      {/* Number of Questions */}
      <div className="num-question-selector">
        <label htmlFor="numQuestion">Number of Questions:</label>
        <input
          type="number"
          id="numQuestion"
          value={numQuestion}
          onChange={(e) => setNumQuestion(e.target.value)}
        />
        {errors.numQuestion && <p className="error-text">{errors.numQuestion}</p>}
      </div>

      {/* Start Quiz Button */}
      <button
        onClick={handleStartQuiz}
        className="start-quiz-button"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Home;



