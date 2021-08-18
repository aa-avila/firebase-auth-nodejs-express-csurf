const PersonalDataModel = require("../models/personalDataModel");

module.exports = class PersonalDataService {
    // Crear personalData
    static async createPersonalData(uid) {
        try {
            const response = await PersonalDataModel.createPersonalData(uid);
            return response;
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }

    // Leer personalData
    static async getPersonalData(uid) {
        try {
            // Get personal data
            let personalData = await PersonalDataModel.getPersonalData(uid);

            // Si no existe, crearla (por ej en caso de que el usuario sea nuevo y no exista aun en la BD)
            if (personalData === undefined) {
                const response = await PersonalDataModel.createPersonalData(uid);
                // console.log('response:', response);
                personalData = await PersonalDataModel.getPersonalData(uid);
                // console.log('new personalData:', personalData);
            }

            return personalData;
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }

    // Actualizar personalData
    static async updatePersonalData(uid, data) {
        try {
            /** Si no hay datos en los campos enviados desde el form, obtener datos existentes en BD */
            if (data.name === '' || data.lastname === '' || data.phone === '') {
                const currentData = await PersonalDataModel.getPersonalData(uid);

                if (data.name === '') {
                    data.name = currentData.name;
                }
                if (data.lastname === '') {
                    data.lastname = currentData.lastname;
                }
                if (data.phone === '') {
                    data.phone = currentData.phone;
                }
            }

            /** Todas letras mayusculas para guardar en BD */
            const nameMayus = data.name.toUpperCase();
            const lastnameMayus = data.lastname.toUpperCase();
            data.name = nameMayus;
            data.lastname = lastnameMayus;

            const response = await PersonalDataModel.updatePersonalData(uid, data);
            return response;
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }
};
