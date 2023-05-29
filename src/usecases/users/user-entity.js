class UserEntity {

  constructor(id, name, lastname, email, password, phone, active, gender, token, role) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.active = active;
    this.gender = gender;
    this.token = token;
    this.role = role;
  }

  serialize() {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      phone: this.phone,
      active: this.active,
      gender: this.gender,
      token: this.token,
      role: this.role
    }
  }
}

module.exports = UserEntity;
