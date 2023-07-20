const appRoot = require('app-root-path');

const UserEntity = require(appRoot + '/src/usecases/users/user-entity');

class UserRepository {

  constructor(mysqlClient) {
    this.connection = mysqlClient;
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
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
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
      sql = connection.format(sql, params);
      connection.query(sql, function (err, result) {
        if (err) {
          console.error(UserRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.length === 0) {
            resolve(null);
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
          u.email = ?
      `;
      const params = [ email ];
      sql = connection.format(sql, params);
      connection.query(sql, function (err, result) {
        if (err) {
          console.error(UserRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.length === 0) {
            resolve(null);
          } else {
            const user = new UserEntity(
              result[0].id,
              result[0].name,
              result[0].last_name,
              result[0].email,
              result[0].password,
              result[0].phone,
              result[0].is_active,
              result[0].gender,
              result[0].token,
              result[0].role,
            )
            resolve(user.serialize());
          }
        }
      })
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
          u.token = ?
      `;
      const params = [ token ];
      sql = connection.format(sql, params);
      connection.query(sql, function (err, result) {
        if (err) {
          console.error(UserRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.length === 0) {
            resolve(null);
          } else {
            const user = new UserEntity(
              result[0].id,
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
        UPDATE users u
        SET u.is_active = true
        WHERE
          u.id = ?
      `;
      const params = [ userId ];
      sql = connection.format(sql, params);
      connection.query(sql, function (err, result) {
        if (err) {
          console.error(UserRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.length === 0) {
            resolve(null);
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
        UPDATE users u
        SET u.photo = ?
        WHERE
          u.id = ?
      `;
      const params = [ JSON.stringify(photo), userId ];
      sql = connection.format(sql, params);
      connection.query(sql, function (err, result) {
        if (err) {
          console.error(UserRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.length === 0) {
            resolve(null);
          } else {
            resolve(true);
          }
        }
      })
    });
  }
}

module.exports = UserRepository;
