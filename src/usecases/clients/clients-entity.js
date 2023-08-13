class ClientEntity {

  constructor(id, name, lastname, email, phone, active, gender, photo, favoriteOrigins) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.active = active;
    this.gender = gender;
    this.photo = photo ? photo.secure_url: '';
    this.favoriteOrigins = favoriteOrigins;
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      phone: this.phone,
      active: this.active,
      gender: this.gender,
      photo: this.photo,
      favoriteOrigins: this.favoriteOrigins
    }
  }
}

module.exports = ClientEntity;
