const createExpressApp = require('./adapters/express');

//Routers
const SignUpRouterV1 = require('./adapters/routers/v1/sign-up/signUp-router');
const LoginRouterV1 = require('./adapters/routers/v1/login/login-router');

//frameworks
const firestore = require('./frameworks/db/firestore');

//Repositorios
const UsersRepository = require('./usecases/users/user-repository');

//Instanciar repositorios
const usersRepository = new UsersRepository(firestore);

let routers = [
  SignUpRouterV1(usersRepository),
  LoginRouterV1(usersRepository)
];

module.exports = createExpressApp(routers);
