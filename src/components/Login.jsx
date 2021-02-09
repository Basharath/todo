import React from 'react';
import { signInGoogle, signInGithub, signInFacebook } from '../firebase/auth';

export default function Login({ asGuest }) {
  return (
    <div className="login">
      <div className="form">
        <button className="btn btn-submit" onClick={() => asGuest(true)}>
          <i className="fas fa-user"></i> Login as Guest
        </button>
        <button className="btn btn-submit" onClick={signInGoogle}>
          <i className="fab fa-google"></i> Login using Google
        </button>
        <button className="btn btn-submit" onClick={signInFacebook}>
          <i className="fab fa-facebook"></i> Login using Facebook
        </button>
        <button className="btn btn-submit" onClick={signInGithub}>
          <i className="fab fa-github"></i> Login using Github
        </button>
      </div>
    </div>
  );
}
