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
            const response = await PersonalDataModel.getPersonalData(uid);
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }

    // Actualizar personalData
    static async updatePersonalData(uid, data) {
        try {
            const response = await PersonalDataModel.updatePersonalData(uid, data);
            return response;
        } catch (error) {
            console.log(error.message);
            return error.message;
        }
    }
};
