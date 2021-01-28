import React from 'react';

export default function Sidebar({ todoList, handleDomTodoList }) {
  const handleClick = (filterBy) => {
    let filtered;
    if (filterBy === 'favorite') {
      filtered = todoList.filter((i) => i.favorite);
    } else if (filterBy === 'all') {
      filtered = [...todoList];
    } else {
      filtered = todoList.filter((i) => i.status.toLowerCase() === filterBy);
    }
    handleDomTodoList(filtered);
  };
  return (
    <div className="sidebar">
      <div className="menu">
        <div className="menu-item" onClick={() => handleClick('all')}>
          <i className="fas fa-th-large"></i>
        </div>
        <div className="menu-item" onClick={() => handleClick('started')}>
          <i className="fas fa-hourglass-start"></i>
        </div>
        <div className="menu-item" onClick={() => handleClick('favorite')}>
          <i className="fas fa-star"></i>
        </div>
        <div className="menu-item" onClick={() => handleClick('done')}>
          <i className="fas fa-check-square"></i>
        </div>
      </div>
    </div>
  );
}
