const appRoot = require('app-root-path');

const ClientEntity = require(appRoot + '/src/usecases/clients/clients-entity');

class ClientsRepository {

  constructor(mysqlClient) {
    this.connection = mysqlClient;
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
      sql = connection.format(sql, params);
      connection.query(sql, function (err, result) {
        if (err) {
          console.error(ClientsRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.length === 0) {
            resolve([]);
          } else {
            let clients = [];
            result.map(row => {
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
}

module.exports = ClientsRepository;
