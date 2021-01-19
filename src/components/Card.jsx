import React from 'react';

export default function Card({ status, text, date }) {
  return (
    <div className="card">
      <div className="status">{status}</div>
      <div className="text">{text}</div>
      <div className="date">{date.slice(0, 12)}</div>
      <div className="btn btn-change">Mark as done</div>
    </div>
  );
}
