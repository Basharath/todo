import React from 'react';
import { signIn } from '../firebase/auth';

export default function Login() {
  return (
    <div className="login">
      <div className="form">
        <button className="btn btn-submit" onClick={signIn}>
          <i className="fab fa-google"></i> Login using Google
        </button>
      </div>
    </div>
  );
}
