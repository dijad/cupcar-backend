const { createResponse } = require('../utils/utils');

async function getClients(clientsRepository) {
  try {
    const clients = await clientsRepository.getClients();
    return createResponse(true, clients);
  }catch(error){
    throw new Error(error.message);
  }
}

async function getProfile(clientsRepository, clientId) {
  try {
    const client = await clientsRepository.getProfile(clientId);
    return createResponse(true, client);
  }catch(error){
    throw new Error(error.message);
  }

}

module.exports = { getClients, getProfile };
