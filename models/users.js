const database = require("../database")
// const middleware = require("../middleware/middleware")
const bcrypt = require("bcrypt");

const modelUser = {
    getAllUsers: async () => {
        const request = await database`SELECT first_name, last_name, phone_number, photo_profile FROM users`;
        return request
    },
    addPostRegister: async (add_data) => {
        const {
            first_name,
            last_name,
            phone_number,
            email,
            password,
            photo_profile,
        } = add_data

        const saltRounds = 15;
        const salt = bcrypt.genSaltSync(saltRounds)
        const hash = bcrypt.hashSync(password, salt)
        
        const request  = await database`INSERT INTO users
        (first_name, last_name, phone_number, email, password, photo_profile)
    values
        (${first_name}, ${last_name}, ${phone_number}, ${email}, ${hash}, ${photo_profile}) RETURNING id`
        
        return request
    },
    checkEmail: async (email) => {
        const checkEmail = await database`SELECT * FROM users WHERE email = ${email}`
        return checkEmail
    }
}

module.exports = modelUser