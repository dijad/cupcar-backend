const ClientEntity = require('./clients-entity');

class ClientsRepository {

  constructor(dbClient) {
    this.connection = dbClient;
  }

  getConnection() {
    return this.connection();
  }

  async getClients() {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let params = [];
      let sql = `
        SELECT
          u.id,
          u.name,
          u.last_name,
          u.email,
          u.phone,
          u.is_active,
          u.gender
        FROM
          users u
        WHERE
          u.role = 'CLIENT';
      `;
      connection.query(sql, params, function (err, result) {
        if (err) {
          console.error(ClientsRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.rows.length === 0) {
            resolve([]);
          } else {
            let clients = [];
            result.rows.map(row => {
              const client = new ClientEntity(
                row.id,
                row.name,
                row.last_name,
                row.email,
                row.phone,
                row.is_active,
                row.gender
              );
              clients.push(client.serialize());
            })
            resolve(clients);
          }
        }
      })
    });
  }

  async getProfile(clientId) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let params = [clientId];
      let sql = `
        SELECT
          u.id,
          u.name,
          u.last_name,
          u.email,
          u.phone,
          u.is_active,
          u.gender,
          u.photo,
          u.favorite_origins
        FROM
          users u
        WHERE
          u.id = $1;
      `;
      connection.query(sql, params, function (err, result) {
        if (err) {
          console.error(ClientsRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.rowCount === 0) {
            resolve([]);
          } else {
              const client = new ClientEntity(
                result.rows[0].id,
                result.rows[0].name,
                result.rows[0].last_name,
                result.rows[0].email,
                result.rows[0].phone,
                result.rows[0].is_active,
                result.rows[0].gender,
                result.rows[0].photo,
                result.rows[0].favorite_origins
              );
            resolve(client.serialize());
          }
        }
      })
    });
  }
}

module.exports = ClientsRepository;
