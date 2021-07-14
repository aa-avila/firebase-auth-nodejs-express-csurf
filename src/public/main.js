window.addEventListener("DOMContentLoaded", () => {
  const firebaseConfig = {
    apiKey: "AIzaSyALrC_0YGPOfQnVb_TN0QIt-CqFQUC1KhI",
    authDomain: "fir-auth-nodejs-express.firebaseapp.com",
    projectId: "fir-auth-nodejs-express",
    storageBucket: "fir-auth-nodejs-express.appspot.com",
    messagingSenderId: "472249787813",
    appId: "1:472249787813:web:ae7664b0c7bc186e53344c",
  };

  firebase.initializeApp(firebaseConfig);

  const fbAuth = firebase.auth();

  fbAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);

  // LOGIN -> Email and Password
  const loginForm = document.querySelector("#login-form");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    fbAuth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        console.log(user.uid);
        return user.getIdToken().then((idToken) => {
          return fetch("/sessionLogin", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "CSRF-Token": Cookies.get("XSRF-TOKEN"),
            },
            body: JSON.stringify({
              idToken,
            }),
          });
        });
      })
      .then(() => {
        return fbAuth.signOut();
      })
      .then(() => {
        window.location.assign("/profile");
      })
      .catch((error) => {
        console.log("Error en login:", error);
        /*
            const loginMsg = document.getElementById('loginMsg');
            loginMsg.innerHTML = 'Usuario y/o contraseña inválidos';
            */
      });
    return false;
  });

  // LOGIN -> GOOGLE SIGNIN
  const googleBtn_signin = document.querySelector("#googleLogin");

  googleBtn_signin.addEventListener("click", () => {
    console.log("google click");

    const provider = new firebase.auth.GoogleAuthProvider();

    fbAuth
      .signInWithPopup(provider)
      .then(({ user }) => {
        console.log(user.uid);
        return user.getIdToken().then((idToken) => {
          return fetch("/sessionLogin", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "CSRF-Token": Cookies.get("XSRF-TOKEN"),
            },
            body: JSON.stringify({
              idToken,
            }),
          });
        });
      })
      .then(() => {
        return fbAuth.signOut();
      })
      .then(() => {
        window.location.assign("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // LOGIN -> FACEBOOK SIGNIN
  const facebookBtn_signin = document.querySelector("#facebookLogin");

  facebookBtn_signin.addEventListener("click", () => {
    console.log("facebook click");

    const provider = new firebase.auth.FacebookAuthProvider();

    fbAuth
      .signInWithPopup(provider)
      .then(({ user }) => {
        console.log(user.uid);
        return user.getIdToken().then((idToken) => {
          return fetch("/sessionLogin", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "CSRF-Token": Cookies.get("XSRF-TOKEN"),
            },
            body: JSON.stringify({
              idToken,
            }),
          });
        });
      })
      .then(() => {
        return fbAuth.signOut();
      })
      .then(() => {
        window.location.assign("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // SIGNUP -> EMAIL
  const signupForm = document.querySelector("#signup-form");

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#signup-email").value;
    const password = document.querySelector("#signup-password").value;

    fbAuth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        console.log(user.uid);
        return user.getIdToken().then((idToken) => {
          return fetch("/sessionLogin", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "CSRF-Token": Cookies.get("XSRF-TOKEN"),
            },
            body: JSON.stringify({
              idToken,
            }),
          });
        });
      })
      .then(() => {
        return fbAuth.signOut();
      })
      .then(() => {
        window.location.assign("/profile");
      })
      .catch((error) => {
        console.log("Error en signup:", error);
        /*
            const loginMsg = document.getElementById('loginMsg');
            loginMsg.innerHTML = 'Usuario y/o contraseña inválidos';
            */
      });
    return false;
  });

  // SIGNUP -> GOOGLE
  const googleBtn_signup = document.querySelector("#googleSignup");

  googleBtn_signup.addEventListener("click", () => {
    console.log("google click");

    const provider = new firebase.auth.GoogleAuthProvider();

    fbAuth
      .signInWithPopup(provider)
      .then(({ user }) => {
        console.log(user.uid);
        return user.getIdToken().then((idToken) => {
          return fetch("/sessionLogin", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "CSRF-Token": Cookies.get("XSRF-TOKEN"),
            },
            body: JSON.stringify({
              idToken,
            }),
          });
        });
      })
      .then(() => {
        return fbAuth.signOut();
      })
      .then(() => {
        window.location.assign("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // SIGNUP -> FACEBOOK
  const facebookBtn_signup = document.querySelector("#facebookSignup");

  facebookBtn_signup.addEventListener("click", () => {
    console.log("facebook click");

    const provider = new firebase.auth.FacebookAuthProvider();

    fbAuth
      .signInWithPopup(provider)
      .then(({ user }) => {
        console.log(user.uid);
        return user.getIdToken().then((idToken) => {
          return fetch("/sessionLogin", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "CSRF-Token": Cookies.get("XSRF-TOKEN"),
            },
            body: JSON.stringify({
              idToken,
            }),
          });
        });
      })
      .then(() => {
        return fbAuth.signOut();
      })
      .then(() => {
        window.location.assign("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
