import React, { useState } from 'react';
import axios from 'axios';


const InputComponent = ({ step, onNextStep }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Process the input as needed
    console.log(`Step ${step} - Input Value: ${inputValue}`);

    // Send data to Google Sheets
    try {
        await axios.post('/api/submitData', { step, inputValue });
      } catch (error) {
        console.error('Error sending data to Google Sheets:', error);
      }
  
      setInputValue('');
      onNextStep();
    };
  

  return (
    <div className="input-container">
      <form onSubmit={handleSubmit}>
        <label>
          Enter Input:
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InputComponent;
