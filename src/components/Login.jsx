import React from 'react';
import { signInGoogle, signInGithub, signInTwitter } from '../firebase/auth';

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
        <button className="btn btn-submit" onClick={signInTwitter}>
          <i className="fab fa-twitter"></i> Login using Twitter
        </button>
        <button className="btn btn-submit" onClick={signInGithub}>
          <i className="fab fa-github"></i> Login using Github
        </button>
      </div>
    </div>
  );
}
