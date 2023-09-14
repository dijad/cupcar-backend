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

async function getCitiesFromText(placesRepository, searchText) {
  try {
    const cities = await placesRepository.getCitiesFromText(searchText);

    const unifiedCities = cities.map(city => ({
      id: city.id,
      cityDanecode: city.cityDaneCode,
      name: `${city.cityName}, ${city.departmentName}`
    }));

    return createResponse(true, unifiedCities);
  } catch (error) {
    throw error;
  }
}

module.exports = { getDepartments, getCitiesByDepartmentDaneCode, getCitiesFromText };
