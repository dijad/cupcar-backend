class ClientEntity {

  constructor(id, name, lastname, email, phone, active, gender) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.phone = phone;
    this.active = active;
    this.gender = gender;
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
    }
  }
}

module.exports = ClientEntity;
