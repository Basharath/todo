import React from 'react';

export default function Login() {
  return (
    <div className="login">
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label htmlFor="name">Email</label>
          <input type="email" />
        </div>
        <button className="btn btn-submit">Submit</button>
      </form>
    </div>
  );
}
