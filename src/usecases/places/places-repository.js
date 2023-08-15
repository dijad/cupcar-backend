const PlaceEntity = require('./places-entity');

class PlacesRepository {

  constructor(dbClient) {
    this.connection = dbClient;
  }

  getConnection() {
    return this.connection();
  }

  async getDepartments() {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let params = [];
      let sql = `
        select
          distinct p.department_name,
          p.department_dane_code
        from
          places p
        order by
          1;
      `;
      connection.query(sql, params, function (err, result) {
        if (err) {
          console.error(ClientsRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.rows.length === 0) {
            resolve([]);
          } else {
            let places = [];
            result.rows.map(row => {
              const place = new PlaceEntity(
                row.id,
                row.department_dane_code,
                row.department_name,
                row.city_dane_code,
                row.city_name,
              );
              places.push(place.serialize());
            })
            resolve(places);
          }
        }
      })
    });
  }

  async getCitiesByDepartmentDaneCode(departmentDaneCode) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let params = [departmentDaneCode];
      let sql = `
        select
          *
        from
          places p
        where
          p.department_dane_code = $1
        order by 5;
      `;
      connection.query(sql, params, function (err, result) {
        if (err) {
          console.error(ClientsRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.rows.length === 0) {
            resolve([]);
          } else {
            let places = [];
            result.rows.map(row => {
              const place = new PlaceEntity(
                row.id,
                row.department_dane_code,
                row.department_name,
                row.city_dane_code,
                row.city_name,
              );
              places.push(place.serialize());
            })
            resolve(places);
          }
        }
      })
    });
  }
}

module.exports = PlacesRepository;
