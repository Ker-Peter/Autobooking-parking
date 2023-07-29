// routes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

router.get('/', authController.showLogin);
router.post('/login', authController.login);
router.get('/dashboard', authController.requireAuth, bookingController.showDashboard);
router.post('/toggle', bookingController.toggleParking);
router.post('/addPlate', bookingController.addLicensePlate);
router.delete('/removeLicensePlate', bookingController.removeLicensePlate);

module.exports = router;
