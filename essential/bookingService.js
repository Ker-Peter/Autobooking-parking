// services/bookingService.js

const axios = require('axios');
const config = require('./config');
const { sleep } = require('./utils');

const bookParking = async () => {
    let bookingId;
    let endTime;
    let retries = 0;
    const maxRetries = 60;

    while (retries < maxRetries && config.toggleState) {
      try {
        const bookResponse = await bookRequest();
        if (!bookResponse.data.status.statusCode === 0) {
          await statusError(bookResponse);
          retries++;
          continue;
        }
        bookingId = bookResponse.data.content.bookingId;
        endTime = bookResponse.data.content.endTime;
        const confirmResponse = await confirmRequest(bookingId);
        if (!confirmResponse.data.status.statusCode === 0) {
          await statusError(confirmResponse);
          retries++;
          continue;
        }
        break;
      } catch (error){
        console.log("Error");
        retries++;
        await sleep(2000);
      }
    }
    if (!config.toggleState || retries >= maxRetries) {
      console.log('Toggle disabled / Max retries reached.');
      config.toggleState == false;
      return;
    }
    console.log('Confirmation Successful.');
    setTimeout(() => {bookParking();}, Date.parse(endTime) - Date.now() + 2 * 60 * 1000);
}
  
function statusError(response) {
  console.log('Error, status:', response.data.status);
  sleep(2000);  
}

async function bookRequest() {
    return await axios.post(config.BOOK_URL, {
        zoneId: config.ZONE_ID,
        cityId: config.CITY_ID,
        licensePlate: config.licensePlate,
        type: config.PARKING_TYPE,
        startTime: null,
        business: false,
        interval: config.INTERVAL
    }, { headers: config.HEADERS });
}
    
async function confirmRequest(bookingId) {
    return await axios.post(config.CONFIRM_URL, {
        zoneId: config.ZONE_ID,
        cityId: config.CITY_ID,
        bookingId,
        licensePlate: config.licensePlate,
        type: config.PARKING_TYPE,
        business: false,
        interval: config.INTERVAL
    }, { headers: config.HEADERS });
}

module.exports = { bookParking }

