const USERS_COLLECTION = 'users';

class FirestoreUser {

  constructor(firestore) {
    this.firestore = firestore;
  }

  async signUp(user) {
    try {

      const response = await this.firestore
        .collection(USERS_COLLECTION).doc(user.email).set(user);

      return response._writeTime ? true : false;

    } catch (err) {
      console.error("failed with ->", err)
    }
  }

  async existUser(email) {
    try {

      const user = await this.firestore
        .collection(USERS_COLLECTION)
        .doc(email)
        .get();

      return user.data();

    } catch (err) {
      console.error("failed with ->", err)
    }
  }

  async login(){}
}

module.exports = FirestoreUser;
