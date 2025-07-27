import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleCorrectChange(e) {
    onUpdate(id, parseInt(e.target.value)); // ensure integer
  }

  function handleDelete() {
    onDelete(id);
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label htmlFor={`select-${id}`}>Correct Answer:</label>
      <select
        id={`select-${id}`}
        value={correctIndex} // ✅ fully controlled
        onChange={handleCorrectChange}
        aria-label="Correct Answer"
      >
        {answers.map((answer, index) => (
          <option key={index} value={index}>
            {answer}
          </option>
        ))}
      </select>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;