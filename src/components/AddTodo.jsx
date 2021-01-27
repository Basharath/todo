import React, { useState, useEffect } from 'react';

export default function AddTodo({
  handleAddTodo,
  handleShow,
  currentTodo,
  handleDelete,
}) {
  const [input, setInput] = useState('');

  const { text, id } = currentTodo;

  useEffect(() => {
    if (text) {
      setInput(text);
    }
  }, [text]);

  const handleChange = ({ currentTarget }) => {
    setInput(currentTarget.value);
  };

  const handleClick = () => {
    if (!input) return;
    handleAddTodo(input, currentTodo.id);
    handleShow();
    setInput('');
  };

  const onDelete = () => {
    handleDelete(id);
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
        autoFocus
      ></textarea>
      <div className="btn-row">
        {id && (
          <button className="btn btn-del-todo" onClick={onDelete}>
            Delete Todo
          </button>
        )}
        <button className="btn btn-add-todo" onClick={handleClick}>
          {id ? 'Update Todo' : 'Add Todo'}
        </button>
      </div>
    </div>
  );
}
