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
          console.error(PlacesRepository.name, "failed with ->", JSON.stringify(err))
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

  async getCitiesByDepartmentDaneCode(departmentDaneCode, searchText) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let params = [departmentDaneCode];
      let filterSearchBy = '';
      if (searchText) {
        filterSearchBy = `and unaccent(LOWER(p.city_name)) ilike '%' || unaccent($2) || '%'`;
        params.push(searchText.toLowerCase());
      }
      let sql = `
        select
          *
        from
          places p
        where
          p.department_dane_code = $1
        ${filterSearchBy}
        order by 5;
      `;
      connection.query(sql, params, function (err, result) {
        if (err) {
          console.error(PlacesRepository.name, "failed with ->", JSON.stringify(err))
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
  async getCitiesFromText(searchText) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let params = [searchText, searchText];
      let sql = `
        select
          distinct p.id,
          p.department_name,
          p.city_dane_code,
          p.city_name
        from
          places p
        where
          unaccent(LOWER(p.department_name)) ilike '%' || unaccent($1) || '%'
          or unaccent(LOWER(p.city_name)) ilike '%' || unaccent($2) || '%';
      `;
      connection.query(sql, params, function (err, result) {
        if (err) {
          console.error(PlacesRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.rows.length === 0) {
            resolve([]);
          } else {
            let places = [];
            result.rows.map(row => {
              const place = new PlaceEntity(
                row.id,
                undefined,
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
