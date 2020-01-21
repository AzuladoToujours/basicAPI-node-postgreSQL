const { Router } = require('express');
const router = Router();
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/index.controller');

router.get('/users', getUsers);
router.post('/new/user', createUser);
router.get('/user/:id', getUserById);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

module.exports = router;
