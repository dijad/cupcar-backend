const createExpressApp = require('./adapters/express');

//Routers
const SignUpRouterV1 = require('./adapters/routers/v1/clients/signUp-router');
const LoginRouterV1 = require('./adapters/routers/v1/clients/login-router');
const TripRouterV1 = require('./adapters/routers/v1/clients/trip/trip-router');
const VerifyAccountRouterV1 = require('./adapters/routers/v1/verify-account/verify-account-router');
const AdminsClientsRouterV1 = require('./adapters/routers/v1/admins/clients/admins-clients-router');
const CompleteUserProfileV1 = require('./adapters/routers/v1/clients/complete-user-profile-router');

//Frameworks
const mysqlConnection = require('./frameworks/db/mysql');

//Repositorios
const UsersRepository = require('./usecases/users/user-repository');
const TripsRepository = require('./usecases/trips/trip-repository');
const ClientsRepository = require('./usecases/clients/clients-repository');

//Instanciar repositorios
const usersRepository = new UsersRepository(mysqlConnection);
const tripsRepository = new TripsRepository(mysqlConnection);
const clientsRepository = new ClientsRepository(mysqlConnection);

let routers = [
  SignUpRouterV1(usersRepository),
  LoginRouterV1(usersRepository),
  TripRouterV1(tripsRepository),
  VerifyAccountRouterV1(usersRepository),
  AdminsClientsRouterV1(clientsRepository),
  CompleteUserProfileV1(usersRepository)
];

module.exports = createExpressApp(routers);
