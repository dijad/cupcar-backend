const { createResponse } = require('../utils/utils');

async function getDepartments(placesRepository) {
  try {
    const departments = await placesRepository.getDepartments();
    return createResponse(true, departments);
  }catch(error){
    throw new Error(error.message);
  }
}

async function getCitiesByDepartmentDaneCode(placesRepository, departmentDaneCode, searchText) {
  try {
    const cities = await placesRepository.getCitiesByDepartmentDaneCode(departmentDaneCode, searchText);
    return createResponse(true, cities);
  }catch(error){
    throw new Error(error.message);
  }
}

module.exports = { getDepartments, getCitiesByDepartmentDaneCode };
