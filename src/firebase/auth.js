import { firebase, auth } from './init';

const signInGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider);
};
const signInFacebook = async () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  await auth.signInWithPopup(provider);
};
const signInGithub = async () => {
  const provider = new firebase.auth.GithubAuthProvider();
  await auth.signInWithPopup(provider);
};

const signOut = async () => {
  await auth.signOut();
  console.log('signed out');
  // .catch((error) => {
  //   console.log(error);
  // });
};

export { signInGoogle, signInFacebook, signInGithub, signOut };
