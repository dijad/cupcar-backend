const UserEntity = require('./user-entity');

class UserRepository {

  constructor(dbClient) {
    this.connection = dbClient;
  }

  getConnection() {
    return this.connection();
  }

  async signUp(user) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let sql = `
        INSERT INTO users (name, last_name, phone, role, gender, email, password, token)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
      `;
      const params = [
        user.name,
        user.lastname,
        user.phone,
        user.role,
        user.gender,
        user.email,
        user.password,
        user.token
      ];
      connection.query(sql, params, function (err, result) {
        if (err) {
          console.error(UserRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.rowCount < 1) {
            resolve(false);
          } else {
            resolve(true);
          }
        }
      })
    });
  }

  async getUserByEmail(email) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let sql = `
        SELECT
          u.id,
          u.name,
          u.last_name ,
          u.phone,
          u.is_active ,
          u.role,
          u.gender,
          u.email ,
          u.password,
          u.token
        FROM
          users u
        WHERE
          u.email = $1
      `;
      const params = [ email ];
      connection.query(sql, params, function (err, result) {
        if (err) {
          console.error(UserRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.rows.length === 0) {
            resolve(null);
          } else {
            const user = new UserEntity(
              result.rows[0].id,
              result.rows[0].name,
              result.rows[0].last_name,
              result.rows[0].email,
              result.rows[0].password,
              result.rows[0].phone,
              result.rows[0].is_active,
              result.rows[0].gender,
              result.rows[0].token,
              result.rows[0].role
            );
            resolve(user);
          }
        }
      });
    });
  }

  async getUserBySecretToken(token) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let sql = `
        SELECT
          u.id,
          u.email
        FROM
          users u
        WHERE
          u.token = $1
      `;
      const params = [ token ];
      connection.query(sql, params, function (err, result) {
        if (err) {
          console.error(UserRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.rows.length === 0) {
            resolve(null);
          } else {
            const user = new UserEntity(
              result.rows[0].id,
            )
            resolve(user.serialize());
          }
        }
      })
    });
  }

  async verifyAccount(userId) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let sql = `
        UPDATE users
        SET is_active = true
        WHERE id = $1
      `;
      const params = [ userId ];
      connection.query(sql, params, function (err, result) {
        if (err) {
          console.error(UserRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.rowCount < 1) {
            resolve(false);
          } else {
            resolve(true);
          }
        }
      })
    });
  }

  async uploadProfilePhoto(userId, photo) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let sql = `
        UPDATE users
        SET photo = $1
        WHERE
          id = $2
      `;
      const params = [ JSON.stringify(photo), userId ];
      connection.query(sql, params, function (err, result) {
        if (err) {
          console.error(UserRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.rowCount < 1) {
            resolve(false);
          } else {
            resolve(true);
          }
        }
      })
    });
  }
}

module.exports = UserRepository;
