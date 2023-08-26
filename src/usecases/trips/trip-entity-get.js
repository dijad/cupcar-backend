class TripEntityGet {

  constructor(
    id, description, seats, tripDate,
    responsibleId, responsibleName, responsibleLastName, responsiblePhone, responsibleEmail,
    originCode, originDepartment, originCity,
    destinationCode, destinationDepartment, destinationCity
  ) {
    this.id = id;
    typeof description !== 'undefined' ? this.description = description : this.description = null;
    this.seats = seats;
    this.tripDate = tripDate;
    this.responsibleId = responsibleId;
    this.responsibleName = responsibleName;
    this.responsibleLastName = responsibleLastName;
    this.responsiblePhone = responsiblePhone;
    this.responsibleEmail = responsibleEmail;
    this.originCode = originCode;
    this.originDepartment = originDepartment;
    this.originCity = originCity;
    this.destinationCode = destinationCode;
    this.destinationDepartment = destinationDepartment;
    this.destinationCity = destinationCity;
  }

  serialize() {
    return {
      id: this.id,
      description: this.description,
      seats: this.seats,
      trip_date: this.tripDate,
      responsible: {
        id: this.responsibleId,
        name: this.responsibleName,
        last_name: this.responsibleLastName,
        phone: this.responsiblePhone,
        email: this.responsibleEmail
      },
      origin: {
        code: this.originCode,
        department: this.originDepartment,
        city: this.originCity
      },
      destination: {
        code: this.destinationCode,
        department: this.destinationDepartment,
        city: this.destinationCity
      }
    }
  }
}

module.exports = TripEntityGet;
