const router = require("express").Router()
const usercontroller = require("../controller/users")
const checkJwt = require("../middleware/middleware")

router.get("/users", usercontroller.getAllUsers_Controller)
// router.get("/movies/:id", moviescontroller.getIDMovies_Controller)
router.post("/users/register", usercontroller.postAddRegister_Controller)
router.get('/users/me', checkJwt.checkJwt , usercontroller.getDetailUser_Controller )

module.exports = router