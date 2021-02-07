import { firebase, auth } from './init';

const signInGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider);
};
const signInTwitter = async () => {};
const signInGithub = async () => {};
const signInGuest = async () => {};

const signOut = async () => {
  await auth.signOut();
  console.log('signed out');
  // .catch((error) => {
  //   console.log(error);
  // });
};

export { signInGoogle, signInGuest, signInTwitter, signInGithub, signOut };
