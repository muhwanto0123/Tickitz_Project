const modelUser = require("../models/users")
const moviesModel = require("../models/users")
const bcrypt = require("bcrypt")

const userController = {
    getAllUsers_Controller: async (req, res) => {
        try{
            const request = await modelUser.getAllUsers()
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

            const checkEmail = await modelUser.checkEmail(email)

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
                email,
                password,
                photo_profile,
            })
            
            
            if (request.length > 0) {
                res.json({
                    status: true,
                    message: "Insert data success",
                })
            } else {
                res.json({
                    status:false,
                    message: 'Fail to post data'
                })
            }
            
            
        }catch(error){
            res.status(502).json({
                status: false,
                message: "Something wrong in our server",
                data: `Sorry Error ${error}`
            })
        }
    },
    postLogin_Controller: async (req, res) => {
        try {
            const { email, password} = req.body
            const checkEmail = await modelUser.checkEmail(email)

            if (checkEmail.lenth === 0){
                res.status(404).json({
                    status: 'false',
                    message: 'Data email not found'
                })
            return 
            }

            const correctPassword = bcrypt.compareSync(password, checkEmail[0].password)
            if(isMatch) {
                const token = jwt.sign(checkEmail[0], process.env.APP_SECRET_TOKEN)
                res.status(200).json({
                    status: 'True',
                    message: 'Login success',
                    accessToken: token
                })
            } else {
                res.status(400).json({
                    status: 'false',
                    message: 'Password incorrect'
                })
            }
        }catch (error){
            res.status(500).json({
                status: 'False',
                message: 'Something wrond in server'
            })
        }
    },
    getDetailUser_Controller: async(req, res) => {
        try {
            const token = req.headers.authorization.slice(7)
            const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN)
            const request = await modelUser.getDetailUser(decoded)

            res.json({
                status:'true',
                message: 'get data sucess',
                data: request
            })
        } catch (error) {
            res.json({
                status: false,
                message : 'something wrong in our server',
                data: []
            })
        }
    }
}

module.exports = userController