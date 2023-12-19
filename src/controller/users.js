const modelUser = require("../models/users");
// const moviesModel = require("../models/users")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const request = await modelUser.getAllUsers();
      res.json({
        status: true,
        message: "Get All data from user sucessfully",
        data: request,
      });
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something wrong in our server",
        data: [],
      });
    }
  },
  postRegister: async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        phone_number,
        email,
        password,
        photo_profile,
      } = req.body;

      const isInputValid =
        first_name &&
        last_name &&
        phone_number &&
        email &&
        password &&
        photo_profile;

      if (!isInputValid) {
        res.status(400).json({
          status: false,
          message: "Bad input, please make sure your input is completed",
        });
        return;
      }

      const checkEmail = await modelUser.checkEmail(email);

      // const checkEmail = modelUser.checkEmail({email})
      if (checkEmail.length > 0) {
        res.status(400).json({
          status: false,
          message: "Email is already registered",
        });
        return;
      }

      const request = await modelUser.addPostRegister({
        first_name,
        last_name,
        phone_number,
        email,
        password,
        photo_profile,
      });

      if (request.length > 0) {
        res.json({
          status: true,
          message: "Insert data success",
        });
      } else {
        res.json({
          status: false,
          message: "Fail to post data",
        });
      }
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something wrong in our server",
        data: `Sorry Error ${error}`,
      });
    }
  },
  postLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkEmail = await modelUser.checkEmail(email);

      if (checkEmail.length === 0) {
        res.status(404).json({
          status: "false",
          message: "Data email not found",
        });
        return;
      }

      const correctPassword = bcrypt.compareSync(
        password,
        checkEmail[0].password
      );
      if (correctPassword) {
        const token = jwt.sign(checkEmail[0], process.env.APP_SECRET_TOKEN);
        res.status(200).json({
          status: "True",
          message: "Login success",
          accessToken: token,
        });
      } else {
        res.status(400).json({
          status: "false",
          message: "Password incorrect",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "False",
        message: "Something wrong in server",
      });
      console.log(error)
    }
  },
  getDetailUser: async (req, res) => {
    try {
      const token = req.headers.authorization.slice(7);
      const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN);
      const request = await modelUser.getDetailUser(decoded);

      res.json({
        status: "true",
        message: "get data sucess",
        data: request,
      });
    } catch (error) {
      res.json({
        status: false,
        message: "something wrong in our server",
        data: [],
      });
    }
  },
  editUser: async (req, res) => {
    try {
      const token = req.headers.authorization.slice(7); // get token from authoriztion and slice 7 string in the front jwt
      const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN); // verify the token with env jwt

      const { id } = decoded;

      const { first_name, last_name, phone_number, email, photo_profile } =
        req.body;

      // validation input must fill data correctly and completed
      const isInputValid =
        first_name && last_name && phone_number && email && photo_profile;

      if (!isInputValid) {
        res.json({
          status: false,
          massage: "please maksure data completely",
        });
        return;
      }

      const request = await modelUser.editUser(id, {
        first_name,
        last_name,
        phone_number,
        email,
        photo_profile,
      });

      res.status(200).json({
        status: "true",
        massage: "Update data success",
        data: request,
      });
    } catch (error) {
      res.status(500).json({
        status: "false",
        massage: "Error in server",
        data: console.log(error),
      });
    }
  },
  editPassword: async (req, res) => {
    try {
      const token = req.headers.authorization.slice(7) // get token from authoriztion and slice 7 string in the fronm jwt
      const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN) // verify the token with env jwt
      const { id } = decoded

      const {
        password
      } = req.body

      // validation input must fill data correctly and completed
      const isInputValid = password

      if (!isInputValid) {
        res.json({
          status: false,
          massage: 'please maksure data completely'
        })
        return
      }

      // this 3 variable is for encryption password
      const saltRounds = 10
      const salt = bcrypt.genSaltSync(saltRounds)
      const hash = bcrypt.hashSync(password, salt) // password is from deconstruction parameter

      const request = await modelUser.editPassword(id, hash) // get data bye token id

      res.status(200).json({
        status: 'true',
        massage: 'Update data success',
        data: request
      })
    } catch (error) {
      res.status(500).json({
        status: 'false',
        massage: 'Error in server'
      })
    }
  }
};

module.exports = userController;
