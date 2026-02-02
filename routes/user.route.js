const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const jwtAuth = require('../middlewares/jwt.middleware');


// router.get('/', controller.getAllUsers);
router.get('/', jwtAuth, controller.getUsers);
router.post('/', controller.createUser); 


module.exports = router;