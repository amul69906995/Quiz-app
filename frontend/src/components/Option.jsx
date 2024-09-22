import React from 'react';
import './option.css'; // Import the CSS file for styling

const Option = ({ options, handleAnswer, idx, answer }) => {
  const handleOptionChange = (event) => {
    handleAnswer(idx, event.target.value);
    console.log("Option selected:", event.target.value, "for question index:", idx);
  };

  return (
    <div className="options-container">
      {options.map((option, index) => (
        <div key={index} className="option">
          <input
            type="radio"
            id={`option-${idx}-${index}`} // Unique ID for each question and option
            name={`options-${idx}`} // Unique name for each question group
            value={option}
            checked={answer[idx] === option} // Check if this option is selected
            onChange={handleOptionChange}
            className="option-input"
          />
          <label htmlFor={`option-${idx}-${index}`} className="option-label">{option}</label>
        </div>
      ))}
    </div>
  );
};

export default Option;

