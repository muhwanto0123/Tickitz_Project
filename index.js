require("dotenv").config()
const express = require("express") //method express
const app = express()
const port = process.env.CLIENT_PORT
const cors = require("cors")
const helmet = require("helmet")

const moviesRouter = require('./routers/movies')

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(moviesRouter)




app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})