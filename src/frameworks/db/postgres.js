const { Client } = require('pg');

function getPostgresClient() {

  const connectionData = {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORTS,
    ssl: {
      rejectUnauthorized: false, // Ignora las certificaciones no válidas (No recomendado para producción)
    },
  }

  const client = new Client(connectionData);
  client.connect();

  return client;
}

module.exports = getPostgresClient;
