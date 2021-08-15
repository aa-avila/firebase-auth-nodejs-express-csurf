const fbModule = require('../firebaseConnect');
const fbAuth = fbModule.fbAuth;
const PersonalDataService = require('../services/personalDataService');

module.exports = class MainCtrl {
    // modelo generador de error
    static async error_gen(req, res, next) {
        try {
            throw new Error('Algo salio mal! (error generado intencionalmente)');
        } catch (e) {
            console.log('Error: ' + e.message);
            const error = new Error(e.message);
            error.status = 413;
            next(error);
        }
    }

    // HOME page
    static async index_page(req, res, next) {
        try {
            const logged = req.logged;

            res.render('home', { title: 'Home', script: 'home.js', logged });
        } catch (e) {
            console.log('Error: ' + e.message);
            const error = new Error(e.message);
            error.status = 500;
            next(error);
        }
    }

    // Profile Page
    static async profile_page(req, res, next) {
        try {
            // Auth state & current user id & email
            const logged = req.logged;
            const userId = req.userId;
            const userEmail = req.userEmail;

            // Get personal data
            let personalData = await PersonalDataService.getPersonalData(userId);

            // Si no existe, crearla (por ej en caso de que el usuario sea nuevo y no exista aun en la BD)
            if (personalData === undefined) {
                const response = await PersonalDataService.createPersonalData(userId);
                // console.log('response:', response);
                personalData = await PersonalDataService.getPersonalData(userId);
                // console.log('new personalData:', personalData);
            }

            // Pack user data
            const userData = {
                id: userId,
                email: userEmail,
                name: personalData.name,
                lastname: personalData.lastname,
                phone: personalData.phone
            }

            const csrfToken = req.csrfToken();

            res.render('profile', { title: 'Perfil', script: 'profile.js', logged, userData, csrfToken });
        } catch (e) {
            console.log('Error: ' + e.message);
            const error = new Error(e.message);
            error.status = 500;
            next(error);
        }
    }

    // Update Pofile (personal data)
    static async updateProfile(req, res, next) {
        try {
            // Get current user & form data
            const userId = req.userId;
            const body = req.body;

            // Pack personalData
            const data = {
                name: body.editProfile_name,
                lastname: body.editProfile_lastname,
                phone: body.editProfile_phone,
            }

            /** AGREGAR VERIFICACION DE DATOS
             * Si no hay datos en los caampos, obtener datos existentes en BD
             * (se pueden traer directo desde el front en el formulario como HIDEDN
             * para asi evitar una nueva query a la DB)
             * 
             * Procesar para que siempre quede mayuscula la primera letra y minuscula el resto
             * 
             */

            await PersonalDataService.updatePersonalData(userId, data);

            res.redirect('/profile');
        } catch (e) {
            console.log('Error: ' + e.message);
            const error = new Error(e.message);
            error.status = 500;
            next(error);
        }
    }

    // Session Login
    static async sessionLogin(req, res) {
        try {
            const idToken = req.body.idToken.toString();
            //const expiresIn = 60 * 60 * 24 * 5 * 1000; //5 days
            const expiresIn = 60 * 60 * 1 * 1000; //1 hour
            //const expiresIn = 60 * 5 * 1000; //5 min

            fbAuth
                .createSessionCookie(idToken, { expiresIn })
                .then(
                    (sessionCookie) => {
                        const options = { maxAge: expiresIn, httpOnly: true };
                        res.cookie("session", sessionCookie, options);
                        res.end(JSON.stringify({ status: "success" }));
                    },
                    (error) => {
                        res.status(401).send("UNAUTHORIZED REQUEST!", error.message);
                    }
                );

        } catch (e) {
            console.log(e.message);
            res.status(413).send(e.message);
        }
    }

    // Session Logout
    static async sessionLogout(req, res) {
        try {
            res.clearCookie("session");
            res.redirect("/");

        } catch (e) {
            console.log(e.message);
            res.status(413).send(e.message);
        }
    }
}