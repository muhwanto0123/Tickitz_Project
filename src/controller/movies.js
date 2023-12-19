const moviesModel = require("../models/movies")

const moviesController = {
    getAllMovies_Controller: async (req, res) => {
        try {
            const permintaan = await moviesModel.getAllMovies()
            res.json({
                status: true,
                pesan: "Data berhasil didapatkan",
                data: permintaan,
            })
        }catch(error){
            console.log(error)
        }
    },
    getIDMovies_Controller: async (req, res) => {
        try{
            const { id } = req.params
            const permintaan = await moviesModel.getIDMovies(id)
            res.json({
                status:true,
                pesan:`data dengan ID : ${id} telah behasil ditampilkan`,
                data:permintaan,
            })
        }catch(error){
            console.log(error)
        }
    },
    postAddMovies_Controller: async (req, res) => {
        try{
            const { release_date, name, poster} = req.body
            const permintaan = await moviesModel.postAddMovies({release_date, name, poster})
            res.json({
                status:true,
                pesan:`data telah ditambahkan`
            })
        }catch(error){
            console.log(error)
        }
    },
    putUpdateMovies_Controller: async (req, res) => {
        try {
            const { id } = req.params
            const columns = [
                "release_date",
                "name",
                "poster",
            ]
            const permintaan = await moviesModel.putUpdateMovies(req.body, columns, id)
            res.json({
                status:true,
                pesan:`data dengan ID ${id} telah di update`
            })
        }catch(error){
            console.log(error)
        }
    },
    deteledSelectedMovies_Controller: async (req, res) => {
        try {
            const { id } = req.params
            const permintaan = await moviesModel.deleteSelectedMovies(id)
            res.json({
                status:true,
                pesan:`data dengan ID : ${id} telah behasil dihapus`,
            })
        }catch(error){
            console.log(error)
        }
    },
}

module.exports = moviesController