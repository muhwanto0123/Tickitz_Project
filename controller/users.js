const moviesModel = require("../models/users")

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
                photo_profile,
            } = req.body
        }catch(error){

        }
    }
}