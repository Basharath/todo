import React, { useState } from 'react';
import { getFormattedDate } from './../util';

export default function AddTodo({ handleAddTodo, handleShow }) {
  const [input, setInput] = useState('');
  const now = new Date();
  const { short } = getFormattedDate(now);

  const handleChange = ({ currentTarget }) => {
    setInput(currentTarget.value);
  };

  const handleClick = () => {
    if (!input) return;
    setInput('');
    handleAddTodo(input, short);
    handleShow();
  };

  return (
    <div className="add-todo" onClick={(e) => e.stopPropagation()}>
      <div className="status">Todo</div>

      <div className="close" onClick={handleShow}>
        <i className="fas fa-times"></i>
      </div>

      <textarea
        onChange={handleChange}
        type="text"
        placeholder="Go for swimming..."
        value={input}
      ></textarea>

      <button className="btn btn-add-todo" onClick={handleClick}>
        Add Todo
      </button>
    </div>
  );
}
