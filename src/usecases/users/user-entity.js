class UserEntity {

  constructor(name, lastname, email, password, gender, phone) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.phone = phone;
    this.active = true;
  }

  serialize() {
    return {
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      gender: this.gender,
      phone: this.phone,
      active: this.active
    }
  }
}

module.exports = UserEntity;
