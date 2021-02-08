import React, { useState } from 'react';

import { signOut } from '../firebase/auth';

export default function Sidebar({
  todoList,
  handleDomTodoList,
  loggedIn,
  asGuest,
}) {
  const [active, setActive] = useState('');

  const handleClick = (filterBy) => {
    setActive(filterBy);
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

  const handleLogin = () => {
    // signIn();
    setActive('');
    asGuest(false);
  };

  const handleLogout = () => {
    signOut();
    setActive('login');
  };

  return (
    <div className="sidebar">
      <div className="menu">
        <div className="menu-item logo">Todo</div>
        <div
          className={'menu-item' + (active === 'all' ? ' active' : '')}
          onClick={() => handleClick('all')}
          title="All todos"
        >
          <i className="fas fa-th-large"></i>
        </div>
        <div
          className={'menu-item' + (active === 'started' ? ' active' : '')}
          onClick={() => handleClick('started')}
          title="Running todos"
        >
          <i className="fas fa-hourglass-start"></i>
        </div>
        <div
          className={'menu-item' + (active === 'favorite' ? ' active' : '')}
          onClick={() => handleClick('favorite')}
          title="Favorite todos"
        >
          <i className="fas fa-star"></i>
        </div>
        <div
          className={'menu-item' + (active === 'done' ? ' active' : '')}
          onClick={() => handleClick('done')}
          title="Done todos"
        >
          <i className="fas fa-check-square"></i>
        </div>
        {loggedIn ? (
          <div
            className={'menu-item' + (active === 'login' ? ' active' : '')}
            onClick={handleLogout}
            title="Signout"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        ) : (
          <div
            className={'menu-item' + (active === 'login' ? ' active' : '')}
            onClick={handleLogin}
          >
            <i className="fas fa-user"></i>
          </div>
        )}
      </div>
    </div>
  );
}
