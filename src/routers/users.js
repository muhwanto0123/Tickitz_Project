const router = require("express").Router()
const usercontroller = require("../controller/users")
const checkJwt = require("../middleware/middleware")

router.get("/users", usercontroller.getAllUsers)
// router.get("/movies/:id", moviescontroller.getIDMovies_Controller)
router.post("/users/register", usercontroller.postRegister)
router.post('/users/login', usercontroller.postLogin)
router.get('/users/me', checkJwt.checkJwt , usercontroller.getDetailUser)
router.put('/users/edit/', checkJwt.checkJwt, usercontroller.editUser)
router.put('/users/edit/password/', checkJwt.checkJwt, usercontroller.editPassword)
module.exports = router