const { createResponse } = require('../utils/utils');

async function getPlaces(placesRepository) {
  try {
    const places = await placesRepository.getPlaces();
    return createResponse(true, places);
  }catch(error){
    throw new Error(error.message);
  }
}

module.exports = { getPlaces };
