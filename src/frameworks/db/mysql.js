const mysql2 = require('mysql2');

function getConnectionMySQL() {
  const host = process.env.MYSQL_HOST;
  const port = process.env.MYSQL_PORT;
  const user = process.env.MYSQL_USER;
  const password = process.env.MYSQL_PASSWORD;
  const database = process.env.MYSQL_DATABASE;

  const pool = mysql2.createPool(
    {
      host: host,
      port: port,
      user: user,
      password: password,
      database: database,
      waitForConnections: true,
      connectionLimit: 1,
      queueLimit: 0
    }
  );

  return pool;
}

module.exports = getConnectionMySQL;
