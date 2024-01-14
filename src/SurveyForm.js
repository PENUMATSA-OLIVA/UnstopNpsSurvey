import React, { useState } from 'react';
import axios from 'axios';

const SurveyForm = () => {
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/surveys', { score, feedback });
      alert('Survey submitted successfully');
    } catch (error) {
      console.error(error);
      alert('Error submitting survey');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Score:
        <input type="number" value={score} onChange={(e) => setScore(e.target.value)} />
      </label>
      <br />
      <label>
        Feedback:
        <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
      </label>
      <br />
      <button type="submit">Submit Survey</button>
    </form>
  );
};

export default SurveyForm;
