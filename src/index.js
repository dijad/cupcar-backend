const createExpressApp = require('./adapters/express');

//Routers
const SignUpRouterV1 = require('./adapters/routers/v1/clients/sign-up/signUp-router');
const LoginRouterV1 = require('./adapters/routers/v1/clients/login/login-router');
const TripRouterV1 = require('./adapters/routers/v1/clients/trip/trip-router');
const VerifyAccountRouterV1 = require('./adapters/routers/v1/verify-account/verify-account-router');

//Frameworks
const mysqlConnection = require('./frameworks/db/mysql');

//Repositorios
const UsersRepository = require('./usecases/users/user-repository');
const TripsRepository = require('./usecases/trips/trip-repository');

//Instanciar repositorios
const usersRepository = new UsersRepository(mysqlConnection);
const tripsRepository = new TripsRepository(mysqlConnection);

let routers = [
  SignUpRouterV1(usersRepository),
  LoginRouterV1(usersRepository),
  TripRouterV1(tripsRepository),
  VerifyAccountRouterV1(usersRepository)
];

module.exports = createExpressApp(routers);
