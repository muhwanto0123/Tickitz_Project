const modelUser = require("../models/users")
const moviesModel = require("../models/users")
const bcrypt = require("bcrypt")

const userController = {
    getAllUsers_Controller: async (req, res) => {
        try{
            const request = await moviesModel.getAllUsers()
            res.json({
                status:true,
                message:"Get All data from user sucessfully",
                data:request,
            })
        }catch(error){
            res.status(502).json({
                status: false,
                message: "Something wrong in our server",
                data: [],
            })
        }
    },
    postAddRegister_Controller: async (req, res) => {
        try{
            const {
                first_name,
                last_name,
                phone_number,
                email,
                password,
                photo_profile,
            } = req.body
            
            
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
                })
                return
            }

            const checkEmail = await database`SELECT * FROM users WHERE email = ${email}`

            // const checkEmail = modelUser.checkEmail({email})
            if (checkEmail.length > 0) {
                res.status(400).json({
                    status: false,
                    message: "Email is already registered",
                })
                return 
            }
            
            const request = await modelUser.addPostRegister({ 
                first_name,
                last_name,
                phone_number,
                password,
                email,
                photo_profile,
            })
            
            
            if (request.length > 0) {
                res.json({
                    status: true,
                    message: "Insert data success",
                })
            }
            
            
        }catch(error){
            res.status(502).json({
                status: false,
                message: "Something wrong in our server",
                data: [],
            })
            console.log(error)
        }
    },
}

module.exports = userController