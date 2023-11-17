const database = require("../database");
// const middleware = require("../middleware/middleware")
const bcrypt = require("bcrypt");

const modelUser = {
  getAllUsers: async () => {
    const request =
      await database`SELECT * FROM users`;
    return request;
  },
  checkEmail: async (email) => {
    const checkEmail =
      await database`SELECT * FROM users WHERE email = ${email}`;
    return checkEmail;
  },
  addPostRegister: async (add_data) => {
    const {
      first_name,
      last_name,
      phone_number,
      email,
      password,
      photo_profile,
    } = add_data;

    const saltRounds = 15;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const request = await database`INSERT INTO users(
            first_name, 
            last_name, 
            phone_number, 
            email, password, 
            photo_profile) VALUES (
                ${first_name}, 
                ${last_name}, 
                ${phone_number}, 
                ${email}, 
                ${hash}, 
                ${photo_profile}
            ) RETURNING id`;

    return request;
  },
  getDetailUser: async (decoded) => {
    const request = await database`SELECT * FROM users where id = ${decoded.id}`
    return request
  }
};

module.exports = modelUser;
