import React, { useState } from 'react';
import { getFormattedDate } from './../util';

export default function AddTodo({ handleAddTodo, handleShow }) {
  const [input, setInput] = useState('');
  const now = new Date();
  const date = getFormattedDate(now);

  const handleChange = ({ currentTarget }) => {
    setInput(currentTarget.value);
  };

  const handleClick = () => {
    setInput('');
    if (input) {
      handleAddTodo(input, date);
    }
    handleShow();
  };

  return (
    <div className="add-todo">
      <div className="input-status">Todo</div>
      <div className="input-text">
        <input
          onChange={handleChange}
          type="text"
          placeholder="Go for swimming..."
          value={input}
        />
      </div>
      <button className="btn btn-add-todo" onClick={handleClick}>
        Add Todo
      </button>
    </div>
  );
}
