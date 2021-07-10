
window.addEventListener("DOMContentLoaded", () => {
    const firebaseConfig = {
      apiKey: "AIzaSyALrC_0YGPOfQnVb_TN0QIt-CqFQUC1KhI",
      authDomain: "fir-auth-nodejs-express.firebaseapp.com",
      projectId: "fir-auth-nodejs-express",
      storageBucket: "fir-auth-nodejs-express.appspot.com",
      messagingSenderId: "472249787813",
      appId: "1:472249787813:web:ae7664b0c7bc186e53344c"
    };

    firebase.initializeApp(firebaseConfig);

    const fbAuth = firebase.auth();

    fbAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);

    const loginForm = document.querySelector('#login-form');

    loginForm
      .addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.querySelector('#login-email').value;
        const password = document.querySelector('#login-password').value;

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
                body: JSON.stringify({ idToken }),
              });
            });
          })
          .then(() => {
            return fbAuth.signOut();
          })
          .then(() => {
            window.location.assign("/profile");
          })
          .catch(error => {
            console.log('Error en login:', error);
            /*
            const loginMsg = document.getElementById('loginMsg');
            loginMsg.innerHTML = 'Usuario y/o contraseña inválidos';
            */
          });
        return false;
      });
  });

  // AGREGAR GOOGLE SIGNIN

  // AGREGAR FACEBOOK SIGNIN
