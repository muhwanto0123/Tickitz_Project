const router = require("express").Router()
const usercontroller = require("../controller/users")

router.get("/users", usercontroller.getAllUsers_Controller)
// router.get("/movies/:id", moviescontroller.getIDMovies_Controller)
router.post("/users/register", usercontroller.postAddRegister_Controller)

module.exports = router