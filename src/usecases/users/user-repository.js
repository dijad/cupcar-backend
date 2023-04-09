const USERS_COLLECTION = "users";

class UserRepository {
  constructor( db ) {
    this.db = db;
  }

  async signUp(user) {
    try {
      this.db.collection(USERS_COLLECTION).doc(user.email).set(user);
      return true;
    } catch (err) {
      console.error("failed with ->", err);
    }
  }

  async getUserByEmail(email) {
    try {
      const users = this.db.collection(USERS_COLLECTION);
      const user = await users.doc(email).get()
      if (user.data()) {
        return user.data();
      }
      return false;
    } catch (err) {
      console.error("failed with ->", err);
    }
  }
}

module.exports = UserRepository;
