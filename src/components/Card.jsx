import React from 'react';

import { ACTION } from './Dashboard';

export default function Card({ todo, dispatch, todoList, handleEdit }) {
  const { status, text, date, favorite, id } = todo;

  const updateTodo = (todo) => {
    const updated = [...todoList];
    const index = todoList.findIndex((i) => i.id === id);
    updated[index] = todo;

    dispatch({ type: ACTION.UPDATE, payload: updated });
  };

  const handleFavorite = () => {
    const todoCopy = todo;
    todoCopy.favorite = !favorite;
    updateTodo(todoCopy);
  };

  const handleStatus = () => {
    const newStatus = status === 'Todo' ? 'Started' : 'Done';
    const todoCopy = todo;
    todoCopy.status = newStatus;
    updateTodo(todoCopy);
  };

  const style =
    status === 'Todo'
      ? { color: 'dodgerblue' }
      : status === 'Started'
      ? { color: 'tomato' }
      : { color: '#00df00' };

  const icon =
    status === 'Todo'
      ? 'paper-plane'
      : status === 'Started'
      ? 'hourglass-start'
      : 'check';

  return (
    <div className="card">
      <div className="status" style={style}>
        {status}
      </div>
      <div className="text">{text}</div>
      <div className="date">{date}</div>
      <div className="row">
        <div className="status-btn" onClick={handleStatus} title={status}>
          <i className={'fas fa-' + icon}></i>
        </div>
        <div className="edit" onClick={() => handleEdit(text, id)}>
          <i className="fas fa-edit"></i>
        </div>
      </div>
      <div className="favorite" onClick={handleFavorite}>
        <i
          className="fas fa-star"
          style={favorite ? { color: 'tomato' } : {}}
        ></i>
      </div>
    </div>
  );
}
