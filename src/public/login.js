console.log('hola en login');

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

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

    document
      .getElementById("login")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const login = event.target.login.value;
        const password = event.target.password.value;

        firebase
          .auth()
          .signInWithEmailAndPassword(login, password)
          .then(({ user }) => {
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
            return firebase.auth().signOut();
          })
          .then(() => {
            window.location.assign("/profile");
          })
          .catch(error => {
            console.log('Error en login:', error);
            const loginMsg = document.getElementById('loginMsg');
            loginMsg.innerHTML = 'Usuario y/o contraseña inválidos';
          });
        return false;
      });
  });