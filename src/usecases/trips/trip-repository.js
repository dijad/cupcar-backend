const TripEntityGet = require('./trip-entity-get');

class TripRepository {

   constructor(dbClient) {
    this.connection = dbClient;
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
        VALUES ($1, $2, $3, $4, $5, $6);
      `;
      const params = [
        origin,
        destination,
        seats,
        description,
        tripDate,
        responsibleUser
      ];
      connection.query(sql, params, function (err, result) {
        if (err) {
          console.error(TripRepository.name, "failed with ->", (JSON.stringify(err)))
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

  async getTripsByAttributes(origin, destination, seats, dateIn) {
    let self = this;
    return new Promise(function (resolve, reject) {
      let connection = self.getConnection();
      let params = [];
      let sql = `
      select
        t.id,
        t.description,
        t.seats,
        t.trip_date,
        u.id as user_id,
        u.name as user_name,
        u.last_name as user_last_name,
        u.phone as user_phone,
        u.email as user_email,
        p_origin.city_dane_code  as origin_code,
        p_origin.department_name as origin_department,
        p_origin.city_name as origin_city,
        p_destination.city_dane_code  as destination_code,
        p_destination.department_name as destination_department,
        p_destination.city_name as destination_city
      from
        trips t
      join users u on
        u.id = t.responsible_user
      join places p_origin on
        p_origin.city_dane_code = t.origin
      join places p_destination on
        p_destination.city_dane_code = t.destination
      where
        t.deleted_at IS NULL
    `;

      let conditions = [];

      if (origin) {
        params.push(origin);
        conditions.push(`t.origin = $${params.length}`);
      }
      if (destination) {
        params.push(destination);
        conditions.push(`t.destination = $${params.length}`);
      }
      if (seats) {
        params.push(seats);
        conditions.push(`t.seats = $${params.length}`);
      }
      if (dateIn) {
        params.push(dateIn);
        if (dateIn.split(' ').length === 1) {
          conditions.push(`DATE(t.trip_date) = $${params.length}`);
        } else {
          conditions.push(`t.trip_date = $${params.length}`);
        }
      }

      if (conditions.length > 0) {
        sql += ` AND (${conditions.join(" OR ")})`;
      }

      connection.query(sql, params, function (err, result) {
        if (err) {
          console.error(TripRepository.name, "failed with ->", JSON.stringify(err))
          reject(new Error('Se encontró un problema en el sistema, contactar a soporte.'));
        } else {
          if (result.rowCount < 1) {
            resolve([]);
          } else {
            let trips = [];
            result.rows.map(row => {
              row.trip_date.setHours(row.trip_date.getHours() - 5);
              const trip = new TripEntityGet(
                row.id,
                row.description,
                row.seats,
                row.trip_date,
                row.user_id,
                row.user_name,
                row.user_last_name,
                row.user_phone,
                row.user_email,
                row.origin_code,
                row.origin_department,
                row.origin_city,
                row.destination_code,
                row.destination_department,
                row.destination_city,
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
