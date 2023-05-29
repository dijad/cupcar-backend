const appRoot = require('app-root-path');

const {
  validateNullsInArrayOfData,
  validateAllNullsInArrayOfData } = require(appRoot + '/src/utils/utils');

async function createTrip(tripRepository, origin = null, destination = null, seats = null, description = null, tripDate = null, responsibleUser) {

  if (seats == 0) seats = null;
  if (description == '') description = null;

  const payloadTrip = [origin, destination, seats, tripDate, description];
  if (validateNullsInArrayOfData(payloadTrip)) {
    return {
      status: false,
      data: 'Campos de viaje incompletos.'
    }
  }

  const trip = await tripRepository.createTrip(origin, destination, seats, description, tripDate, responsibleUser);

  if (trip) return {
    status: true,
    data: 'Viaje creado satisfactoriamente.'
  }

  return {
    status: false,
    data: 'Error al crear el viaje.'
  }
}

async function getTripsByAttributes(tripRepository, origin = null, destination = null, seats = null) {

  if (seats == 0) {
    seats = null
  };

  const payloadTrip = [origin, destination, seats];
  if (validateAllNullsInArrayOfData(payloadTrip)) {
    return {
      status: false,
      data: 'Es necesario al menos un campo de búsqueda.'
    }
  }

  const trips = await tripRepository.getTripsByAttributes(origin, destination, Number(seats));

  return {
    status: true,
    data: trips
  }
}

module.exports = {
  createTrip,
  getTripsByAttributes
};
