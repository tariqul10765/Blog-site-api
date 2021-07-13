const router = require('express').Router();

const authController = require('../controller/userAuth');

router.post('/registration', authController.registrationController); // '/auth/registration'
router.post('/login', authController.loginController); // '/auth/login'
router.get('/', authController.verifyToken, authController.authorizedController); // '/auth'

module.exports = router;