class PlaceEntity {

  constructor(id, departmentDaneCode, departmentName, cityDaneCode, cityName) {
    this.id = id;
    this.departmentDaneCode = departmentDaneCode;
    this.departmentName = departmentName;
    this.cityDaneCode = cityDaneCode;
    this.cityName = cityName;
  }

  serialize() {
    return {
      id: this.id,
      departmentDaneCode: this.departmentDaneCode,
      departmentName: this.departmentName,
      cityDaneCode: this.cityDaneCode,
      cityName: this.cityName,
    }
  }
}

module.exports = PlaceEntity;
