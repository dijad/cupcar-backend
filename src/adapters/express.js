const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const dotenv = require('dotenv');

async function createExpressApp(routers) {
  const app = express();

  dotenv.config();

  app.get('/', (req, res) => {
    res.send('I am TripPartner project :)');
  });

  app.set('port', process.env.PORT || 3000);

  app.use(morgan('dev'));

  app.use(cors());

  app.use(express.json());

   for (let router of routers) {
    app.use(router);
  }

  app.listen(app.get('port'), () => {
    console.log(`Server started on port ${app.get('port')}`);
  });
}

module.exports = createExpressApp;
