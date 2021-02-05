import { firebase, auth } from './init';

const signIn = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider);
};

const signOut = async () => {
  await auth.signOut();
  console.log('signed out');
  // .catch((error) => {
  //   console.log(error);
  // });
};

export { signIn, signOut };
