class UserEntity {

  constructor(name, lastname, email, password, phone, gender) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.active = false;
    this.gender = gender;
  }

  serialize() {
    return {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      phone: this.phone,
      active: this.active,
      gender: this.gender
    }
  }
}

module.exports = UserEntity;
