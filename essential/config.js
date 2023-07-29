// config.js

let toggleState = false;
let licensePlate = null;
const PORT = 8461;
const HASHED_PASSWORD = ''; //set a password for the dashboard login as a sha254 hashed string
const AUTH_TOKEN = ''; //your handyparken auth token
const BOOK_URL = 'https://handyparken.at/api/private/booking/v2/book';
const CONFIRM_URL = 'https://handyparken.at/api/private/booking/v2/confirm';
const ZONE_ID = 1;
const CITY_ID = 99;
const PARKING_TYPE = 'MINUTE';
const INTERVAL = 15;

const HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
    'Accept-Language': 'de-at',
    'Hp-Device-Type': 'Apple',
    'User-Agent': 'HANDYParken/5.7.0 (iOS; 31298)',
    Authorization: `Bearer ${AUTH_TOKEN}`,
    'Accept-Encoding': 'gzip, deflate'
};

let LICENSE_PLATES = [
    {name: 'Car 1', number: 'W123456'},
    {name: 'Car 2', number: 'W654321'} 
  ];

module.exports = {
  toggleState,
  licensePlate,
  PORT,
  HASHED_PASSWORD,
  BOOK_URL,
  CONFIRM_URL,
  ZONE_ID,
  CITY_ID,
  PARKING_TYPE,
  INTERVAL,
  HEADERS,
  LICENSE_PLATES
};