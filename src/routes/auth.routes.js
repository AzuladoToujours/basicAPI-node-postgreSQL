const { Router } = require('express');
const router = Router();

const { userSignUpValidator } = require('../helpers/validator.helper');
const { SignIn, SignUp } = require('../controllers/auth.controller');

router.post('/signup', userSignUpValidator, SignUp);
router.post('/signin', SignIn);

module.exports = router;
