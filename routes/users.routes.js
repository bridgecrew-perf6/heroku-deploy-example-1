const express = require('express');
const { body } = require('express-validator');

// Middlewares
const {
  userExists,
  protectToken,
  protectAdmin,
  protectAccountOwner,
} = require('../middlewares/users.middlewares');
const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

// Controller
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  checkToken,
} = require('../controllers/users.controller');

const router = express.Router();

router.post('/', createUserValidations, checkValidations, createUser);

router.post('/login', login);

// Apply protectToken middleware. Todos los endpoints de abajo usarán el middleware de token, porque la lectura del código 
// va de arriba hacia abajo, o sea, el protectToken va a afectar a todos y todos van a requerir 
//que se les pase el token. Por eso se sacó el endpoint del createUser, porque no se le puede pedir un token, ya que es usuario nuevo. 
router.use(protectToken);

router.get('/', protectAdmin, getAllUsers);

router.get('/check-token', checkToken);

router
  .route('/:id')
  .get(protectAdmin, userExists, getUserById)
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
