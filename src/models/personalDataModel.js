const fbModule = require('../firebase/firebaseConnect');
const db = fbModule.db;

module.exports = class PersonalDataModel {
  // createPersonalData
  static async createPersonalData(uid) {
    try {
      const data = {
        name: '-',
        lastname: '-',
        phone: '-'
      };

      const response = await db
        .collection('users/' + uid + '/userInfo')
        .doc('personalData')
        .set(data);
      // console.log(response);

      return response;
    } catch (error) {
      console.log(error.message);
      // return error.message;
    }
  }

  // getPersonalData
  static async getPersonalData(uid) {
    try {
      const docRef = db
        .collection('users/' + uid + '/userInfo')
        .doc('personalData');
      const doc = await docRef.get();
      const data = doc.data();

      return data;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }

  // updatePersonalData
  static async updatePersonalData(uid, data) {
    try {
      const response = await db
        .collection('users/' + uid + '/userInfo')
        .doc('personalData')
        .set(data);

      return response;
    } catch (error) {
      console.log(error.message);
      return error.message;
    }
  }
};
