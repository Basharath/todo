import React from 'react';

export default function Login() {
  return (
    <div className="login">
      <form>
        <div className="form-group">
          <label htmlFor="name">Email</label>
          <input type="email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" />
        </div>
        <button className="btn btn-submit">Submit</button>
      </form>
    </div>
  );
}
