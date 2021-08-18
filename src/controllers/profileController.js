const PersonalDataService = require('../services/personalDataService');

/** Funcion capitalizar string */
function PrimeraLetraMayuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = class ProfileCtrl {
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
            let newData = {
                name: body.editProfile_name,
                lastname: body.editProfile_lastname,
                phone: body.editProfile_phone,
            }

            /** Si no hay datos en los campos enviados desde el form, obtener datos existentes en BD */
            if (newData.name === '' || newData.lastname === '' || newData.phone === '') {
                const currentData = await PersonalDataService.getPersonalData(userId);

                if (newData.name === '') {
                    newData.name = currentData.name;
                }
                if (newData.lastname === '') {
                    newData.lastname = currentData.lastname;
                }
                if (newData.phone === '') {
                    newData.phone = currentData.phone;
                }
            }

            /** Mayuscula la primera letra y minuscula el resto */
            const nameCapitalized = PrimeraLetraMayuscula(newData.name);
            newData.name = nameCapitalized;
            const lastnameCapitalized = PrimeraLetraMayuscula(newData.lastname);
            newData.lastname = lastnameCapitalized;
            console.log(newData);

            /** Actualizar BD */
            await PersonalDataService.updatePersonalData(userId, newData);

            res.redirect('/profile');
        } catch (e) {
            console.log('Error: ' + e.message);
            const error = new Error(e.message);
            error.status = 500;
            next(error);
        }
    }

}