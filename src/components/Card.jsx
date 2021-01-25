import React from 'react';

import { ACTION } from './Dashboard';

export default function Card({ todo, dispatch, todoList }) {
  const { status, text, date, favorite, id } = todo;
  const handleFavorite = () => {
    const favTodo = todo;
    favTodo.favorite = !favorite;
    const updated = [...todoList];
    const index = todoList.findIndex((i) => i.id === id);
    updated[index] = favTodo;

    dispatch({ type: ACTION.FAVORITE, payload: updated });
  };

  return (
    <div className="card">
      <div className="status">{status}</div>
      <div className="text">{text}</div>
      <div className="date">{date}</div>
      <div className="row">
        <div className="status-btn">
          <i className="fas fa-check"></i>
        </div>
        <div className="edit">
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
