const createExpressApp = require('./adapters/express');

//Routers
const SignUpRouterV1 = require('./adapters/routers/v1/sign-up/signUp-router');
const LoginRouterV1 = require('./adapters/routers/v1/login/login-router');

//frameworks
const firestore = require('./frameworks/db/firestore');

//Repositorios
const FirestoreUsers = require('./usecases/users/user-firestore');

//Instanciar repositorios
const firestoreUsers = new FirestoreUsers(firestore);

let routers = [
  SignUpRouterV1(firestoreUsers),
  LoginRouterV1(firestoreUsers)
];

module.exports = createExpressApp(routers);
