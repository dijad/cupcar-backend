const createExpressApp = require('./adapters/express');

//Routers
const SignUpRouterV1 = require('./adapters/routers/v1/clients/signUp-router');
const LoginRouterV1 = require('./adapters/routers/v1/clients/login-router');
const TripRouterV1 = require('./adapters/routers/v1/clients/trip/trip-router');
const VerifyAccountRouterV1 = require('./adapters/routers/v1/verify-account/verify-account-router');
const AdminsClientsRouterV1 = require('./adapters/routers/v1/admins/clients/admins-clients-router');
const ClientsProfileRouterV1 = require('./adapters/routers/v1/clients/clients-profile-router');
const PlacesRouterV1= require('./adapters/routers/v1/places/places-router');

//Frameworks
const postgresConnection = require('./frameworks/db/postgres');
//Repositorios
const UsersRepository = require('./usecases/users/user-repository');
const TripsRepository = require('./usecases/trips/trip-repository');
const ClientsRepository = require('./usecases/clients/clients-repository');
const PlacesRepository = require('./usecases/places/places-repository')

//Instanciar repositorios
const usersRepository = new UsersRepository(postgresConnection);
const tripsRepository = new TripsRepository(postgresConnection);
const clientsRepository = new ClientsRepository(postgresConnection);
const placesRepository = new PlacesRepository(postgresConnection);

let routers = [
  SignUpRouterV1(usersRepository),
  LoginRouterV1(usersRepository),
  TripRouterV1(tripsRepository),
  VerifyAccountRouterV1(usersRepository),
  AdminsClientsRouterV1(clientsRepository),
  ClientsProfileRouterV1(usersRepository, clientsRepository),
  PlacesRouterV1(placesRepository)
];

module.exports = createExpressApp(routers);
