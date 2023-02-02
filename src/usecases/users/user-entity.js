class UserEntity {

  constructor(name, lastname, email, password, phone) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.active = true;
  }

  serialize() {
    return {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      phone: this.phone,
      active: this.active
    }
  }
}

module.exports = UserEntity;
