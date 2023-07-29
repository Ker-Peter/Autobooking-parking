// controllers/bookingController.js

const bookingService = require('../essential/bookingService');
const config = require('../essential/config');

exports.showDashboard = async (req, res) => {
    const auth = req.cookies.auth;
    if (auth === config.HASHED_PASSWORD) {
        let toggleChecked = '';
        if (config.toggleState) {
            toggleChecked = 'checked';
        }
        res.render('../dashboard', {
            LICENSE_PLATES: config.LICENSE_PLATES,
            toggleChecked: toggleChecked
          });
} else {
    res.send('Unauthorized');
}
};

exports.removeLicensePlate = async (req, res) => {
    const number = req.body.number;
    config.LICENSE_PLATES = config.LICENSE_PLATES.filter(p => p.number !== number);
    res.sendStatus(200);
};

exports.toggleParking = async (req, res) => {
    const { state, licensePlate } = req.body;
    config.licensePlate = licensePlate;
    config.toggleState = state; 
    if (!config.toggleState) {
        return res.sendStatus(200);
    }
    await bookingService.bookParking(req.body);
    res.sendStatus(200);
};

exports.addLicensePlate = async (req, res) => {
    const { name, number } = req.body;
    config.LICENSE_PLATES.push({
      name,
      number
    });
    res.sendStatus(200);
};