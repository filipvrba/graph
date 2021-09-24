/**
 * Firebase
 */
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAuth, signInWithRedirect, getRedirectResult, GithubAuthProvider } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCN1S-HnEXy3q0Tdgah1hWpUAM09Zdqcu0",
  authDomain: "graph-docs.firebaseapp.com",
  projectId: "graph-docs",
  storageBucket: "graph-docs.appspot.com",
  messagingSenderId: "150998359290",
  appId: "1:150998359290:web:c2ad4a06f020bbcfe17d43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

/**
 * Github
 */
const provider = new GithubAuthProvider();
const auth = getAuth();

function githubSignIn() {

    signInWithRedirect(auth, provider);

}

const res = null;

document.addEventListener( 'loadedPage', () => {

    const signIn = document.getElementById( 'signIn' );

    if ( signIn ) {

      signIn.addEventListener( 'click', () => {

          githubSignIn();

      } )

    }

    const avatar = document.getElementById( 'avatar' );

    getRedirectResult(auth)
.then((result) => {
  const credential = GithubAuthProvider.credentialFromResult(result);
  if (credential) {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const token = credential.accessToken;
    const user = result.user;
    // ...
    avatar.setAttribute( 'src', user.photoURL );
    res = result;
    console.log( result );
  }

  // The signed-in user info.
  const user = result.user;
}).catch((error) => {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  // The email of the user's account used.
  const email = error.email;
  // The AuthCredential type that was used.
  const credential = GithubAuthProvider.credentialFromError(error);
  // ...
});

} )

console.log( res );