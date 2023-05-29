class UserEntity {

  constructor(id, origin, destination, seats, tripDate, description, responsibleUserEmail) {
    this.id = id;
    this.origin = origin;
    this.destination = destination;
    this.seats = seats;
    this.tripDate = tripDate;
    typeof description !== 'undefined' ? this.description = description : this.description = null;
    this.responsible_user_email = responsibleUserEmail;
  }

  serialize() {
    return {
      id: this.id,
      origin: this.origin,
      destination: this.destination,
      seats: this.seats,
      tripDate: this.tripDate,
      description: this.description,
      responsible_user_email: this.responsible_user_email
    }
  }
}

module.exports = UserEntity;
