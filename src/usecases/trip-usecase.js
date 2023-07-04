const appRoot = require('app-root-path');

const { createResponse } = require(appRoot + '/src/utils/utils');

const {
  validateNullsInArrayOfData,
  validateAllNullsInArrayOfData } = require(appRoot + '/src/utils/utils');

async function createTrip(tripRepository, origin = null, destination = null, seats = null, description = null, tripDate = null, responsibleUser) {

  try {
    if (seats == 0) seats = null;
    if (description == '') description = null;

    const payloadTrip = [origin, destination, seats, tripDate, description];
    if (validateNullsInArrayOfData(payloadTrip)) {
      return createResponse(false, 'Campos de viaje incompletos.');
    }

    const trip = await tripRepository.createTrip(origin, destination, seats, description, tripDate, responsibleUser);

    if (trip) {
      return createResponse(true, 'Viaje creado satisfactoriamente.');
    }
    return createResponse(false, 'Error al crear el viaje.');
  } catch (error) {
    if (error == 'Error: ER_DUP_ENTRY') {
      throw new Error('Viaje ya existente');
    }
  }
}

async function getTripsByAttributes(tripRepository, origin = null, destination = null, seats = null) {

  if (seats == 0) {
    seats = null
  };

  const payloadTrip = [origin, destination, seats];
  if (validateAllNullsInArrayOfData(payloadTrip)) {
    return createResponse(false, 'Es necesario al menos un campo de búsqueda.');
  }

  const trips = await tripRepository.getTripsByAttributes(origin, destination, Number(seats));

  return createResponse(true, trips);
}

module.exports = {
  createTrip,
  getTripsByAttributes
};
