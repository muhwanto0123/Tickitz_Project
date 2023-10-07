const router = require("express").Router()
const moviesController = require("../controller/movies")
const moviescontroller = require("../controller/movies")

router.get("/movies", moviescontroller.getAllMovies_Controller)
router.get("/movies/:id", moviesController.getIDMovies_Controller)
router.post("/movies", moviescontroller.postAddMovies_Controller)
router.put("/movies/:id", moviesController.putUpdateMovies_Controller)
router.delete("/movies/:id", moviesController.deteledSelectedMovies_Controller)

module.exports = router