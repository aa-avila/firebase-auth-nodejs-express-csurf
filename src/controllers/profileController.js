const PersonalDataService = require('../services/personalDataService');

module.exports = class ProfileCtrl {
    // Profile Page
    static async profile_page(req, res, next) {
        try {
            // Auth state & current user id & email
            const logged = req.logged;
            const userId = req.userId;
            const userEmail = req.userEmail;

            // Get personal data
            const personalData = await PersonalDataService.getPersonalData(userId);

            // Pack user data
            const userData = {
                id: userId,
                email: userEmail,
                name: personalData.name,
                lastname: personalData.lastname,
                phone: personalData.phone
            }

            /** Pasa el csrfToken a la pagina (formulario edit) */
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
            let formData = {
                name: body.editProfile_name,
                lastname: body.editProfile_lastname,
                phone: body.editProfile_phone,
            }

            /** Actualizar BD */
            await PersonalDataService.updatePersonalData(userId, formData);

            res.redirect('/profile');
        } catch (e) {
            console.log('Error: ' + e.message);
            const error = new Error(e.message);
            error.status = 500;
            next(error);
        }
    }

}