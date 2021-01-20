import React from 'react';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="menu">
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
