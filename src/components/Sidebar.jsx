import React, { useState } from 'react';

export default function Sidebar() {
  const [show, setShow] = useState(false);
  return (
    <div className="sidebar">
      <div
        className={'toggler' + (show ? ' show' : '')}
        onClick={() => setShow(!show)}
      >
        <i className="fas fa-bars"></i>
      </div>
      <div className={'menu' + (show ? ' show' : '')}>
        <div className="menu-item">
          <i className="fas fa-th-large"></i>
        </div>
        <div className="menu-item">
          <i className="fas fa-star"></i>
        </div>
        <div className="menu-item">
          <i className="fas fa-check-square"></i>
        </div>
        <div className="menu-item">
          <i className="fas fa-trash-alt"></i>
        </div>
      </div>
    </div>
  );
}
