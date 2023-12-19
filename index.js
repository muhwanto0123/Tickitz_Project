require("dotenv").config();
const express = require("express"); //method express
const cors = require("cors")
const helmet = require("helmet")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")

const app = express();
const port = process.env.CLIENT_PORT;

const moviesRouter = require("./src/routers/movies");
const usersRouter = require("./src/routers/users");
const cinemaRouter = require("./src/routers/cinemas");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
)

app.use(helmet())
app.use(moviesRouter);
app.use(usersRouter);
app.use(cinemaRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
