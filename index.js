require("dotenv").config()
const express = require("express") //method express
// const cors = require("cors")
// const helmet = require("helmet")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")


const app = express()
const port = process.env.CLIENT_PORT

const moviesRouter = require('./routers/movies')
const usersRouter = require('./routers/users');


app.use(express.urlencoded({extended: false}))
app.use(express.json())
// app.use(
//     cors({
//         origin: "*",
//         methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//     })
// )

// app.use(helmet())
app.use(moviesRouter)
app.use(usersRouter)




app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})