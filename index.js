const express = require("express") //method express
const app = express()
const port = 3000
const database = require("./database.js")

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.get("/movies", async (req, res) => {
    try { 
        const request = await database `SELECT * FROM movies`
        const requestMapping = request.map(
            ({id, name, duration, genres, poster}) => ({
                id,
                name,
                duration,
                genres,
                poster,
            })
        )
        res.json({
            status: true,
            message: "data sucess",
            data: requestMapping,
        })
    }catch(error){
        console.log(error)
    }
})

app.get("/movies/:id", async (req, res) => {
    try { 
        const { id } = req.params
        const request = await database `SELECT * FROM movies WHERE id = ${id}`
        res.json({
            status: true,
            message: "data sucess",
            data: request,
        })
    }catch(error){
        res.status(502).json({
            status:false,
            message: "something wrong in our system",
            data: [],
        })
    }
})

app.post('/movies', async (req, res) => {
    try { 
        const {
            id, 
            name,
            release_date,
            duration,
            directed_by,
            genres,
            casts,
            synopsis,
            poster,
         } = req.body

        const isInputValid =
            id &&
            name &&
            release_date &&
            duration &&
            directed_by &&
            genres &&
            casts &&
            synopsis &&
            poster
        
        if (!isInputValid){
            res.status(400).json({
                status: false,
                message: "Bad input, please make sure your input is completed"
            })
        }
         
        
        const request = await database `INSERT INTO movies
            (id, name, release_date, duration, directed_by, genres, casts, synopsis, poster)
         values
            (${id}, ${name}, ${release_date}, ${duration}, ${genres}, ${directed_by}, ${casts}, ${synopsis}, ${poster} ) RETURNING id`

        if (request.length > 0) {
            res.json({
                status: true,
                message: "insert data sucess",
                // data: request,
            })
        }
    }catch(error){
        res.status(502).json({
            status:false,
            message: "something wrong in our system",
            data: [],
        })
    }
})

app.put("/movies/:id", async(req, res) => {
    try{
        const {id} = req.params
        const column = [
            "name",
            "release_date",
            "duration",
            "directed_by",
            "genres",
            "casts",
            "synopsis",
            "poster",
        ]

        
        const request = await database`UPDATE movies SET ${database(req.body, columns)} WHERE id = ${id} RETURNING id`

        if (request.length > 0) {
            res.json({
                status: true,
                message: "Update data success",
            })
        }
    }catch(error){
        console.log(error)
        res.status(502).json({
            status: false,
            message: "Ada yang salah di dalam server",
            data: [],
        })
    }
})

app.delete("/movies/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const request = await database`DELETE FROM movies WHERE id = ${id}`;
  
      res.json({
        status: true,
        message: "Delete data success",
        data: request,
      });
    } catch (error) {
      res.status(502).json({
        status: false,
        message: "Something wrong in our server",
        data: [],
      });
    }
});

app.listen(port, () => {
    console.log(`example app listening ${port}`)
})