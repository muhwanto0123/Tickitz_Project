const router = require("express").Router()
const moviescontroller = require("../controller/movies")

router.get("/movies", moviescontroller.getAllMovies_Controller)
router.get("/movies/:id", moviescontroller.getIDMovies_Controller)
router.post("/movies", moviescontroller.postAddMovies_Controller)
router.put("/movies/:id", moviescontroller.putUpdateMovies_Controller)
router.delete("/movies/:id", moviescontroller.deteledSelectedMovies_Controller)

module.exports = router