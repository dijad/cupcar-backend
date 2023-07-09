const appRoot = require('app-root-path');

const { createResponse } = require(appRoot + '/src/utils/utils');

async function getClients(clientsRepository) {
  try {
    const clients = await clientsRepository.getClients();
    return createResponse(true, clients);
  }catch(error){
    throw new Error(error.message);
  }
}

module.exports = { getClients };
