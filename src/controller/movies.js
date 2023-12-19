const moviesModel = require("../models/movies");

const moviesController = {
  getAllMovies_Controller: async (req, res) => {
    try {
      const permintaan = await moviesModel.getAllMovies();
      res.json({
        status: true,
        pesan: "Data berhasil didapatkan",
        data: permintaan,
      });
    } catch (error) {
      console.log(error);
    }
  },
  getIDMovies_Controller: async (req, res) => {
    try {
      const { id } = req.params;
      const permintaan = await moviesModel.getIDMovies(id);
      res.json({
        status: true,
        pesan: `data dengan ID : ${id} telah behasil ditampilkan`,
        data: permintaan,
      });
    } catch (error) {
      console.log(error);
    }
  },
  postAddMovies_Controller: async (req, res) => {
    try {
      const {
        name,
        release_date,
        duration,
        genres,
        directed_by,
        casts,
        synopsys,
        poster,
      } = req.body;
      const request = await moviesModel.postAddMovies({
        name,
        release_date,
        duration,
        genres,
        directed_by,
        casts,
        synopsys,
        poster,
      });
      if (request.length > 0) {
        res.json({
          status: true,
          pesan: `insert data sucess`,
        });
      } else {
        res.json({
          status: false,
          message: "fail to add data",
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  putUpdateMovies_Controller: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        release_date,
        duration,
        genres,
        directed_by,
        casts,
        synopsys,
        poster,
      } = req.body;
      const permintaan = await moviesModel.putUpdateMovies(
        {
          name,
          release_date,
          duration,
          genres,
          directed_by,
          casts,
          synopsys,
          poster,
        },
        id
      );
      res.status(200).json({
        status: true,
        pesan: `data dengan ID ${id} telah di update`,
        data: permintaan,
      });
    } catch (error) {
      res.status(502).json({
        status: "Error",
        massage: "Something wrong in server",
      });
      console.log(error);
    }
  },
  deteledSelectedMovies_Controller: async (req, res) => {
    try {
      const { id } = req.params;
      const permintaan = await moviesModel.deleteSelectedMovies(id);
      res.json({
        status: true,
        pesan: `data dengan ID : ${id} telah behasil dihapus`,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = moviesController;
