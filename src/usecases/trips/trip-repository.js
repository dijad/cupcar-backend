const TripEntity = require('./trip-entity');

class TripRepository {

   constructor(mysqlClient) {
    this.connection = mysqlClient;
  }

  getConnection() {
    return this.connection();
  }

  async createTrip(origin, destination, seats, description, tripDate, responsibleUser) {
   let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let sql = `
        INSERT INTO trips (origin, destination, seats, description, trip_date, responsible_user)
        VALUES (?, ?, ?, ?, ?, ?);
      `;
      const params = [
        origin,
        destination,
        seats,
        description,
        tripDate,
        responsibleUser
      ];
      sql = connection.format(sql, params);
      connection.query(sql, function (err, result) {
        if (err) {
          console.error(TripRepository.name, "failed with ->", (JSON.stringify(err)))
          reject(new Error(err.code, 'Se encontró un problema en sistema, contactar a soporte.'))
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

  async getTripsByAttributes(origin, destination, seats, dateIn) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let params = [];
      let sql = `
        SELECT
          t.id,
          t.description,
          t.origin,
          t.destination,
          t.responsible_user,
          t.seats,
          t.trip_date
        FROM
          trips t
        WHERE
          t.deleted_at IS NULL
      `;
      if (origin) {
        params.push(origin);
        sql +=  'AND t.origin = ?';
      }
      if (destination) {
        params.push(destination);
        sql +=  'AND t.destination = ?';
      }
      if (seats) {
        params.push(seats);
        sql += 'AND t.seats >= ?';
      }

      if (dateIn) {
        params.push(dateIn);
        sql += ' AND t.trip_date = ?'
      }
      sql = connection.format(sql, params);
      connection.query(sql, function (err, result) {
        if (err) {
          console.error(TripRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en sistema, contactar a soporte.'))
        } else {
          if (result.length === 0) {
            resolve([]);
          } else {
            let trips = [];
            result.map(row => {
              const trip = new TripEntity(
                row.id,
                row.origin,
                row.destination,
                row.seats,
                row.description,
                row.trip_date,
                row.responsible_user
              );
              trips.push(trip.serialize());
            })
            resolve(trips);
          }
        }
      })
    });
  }
}

module.exports = TripRepository;
