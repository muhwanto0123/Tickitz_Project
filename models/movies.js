const database = require("../database")

const modelMovies = {
    getAllMovies: async () => {
        const permintaan = await database`SELECT * FROM movies`
        return permintaan
    },
    getIDMovies: async (id) => {
        const permintaan = await database`SELECT * FROM movies WHERE id=${id}`
        return permintaan
    },
    postAddMovies: async (data_Add) => {
        const {
            release_date,
            name,
            poster
        } = data_Add
        const permintaan = await database`INSERT INTO movies (release_date, name, poster) VALUES (${release_date}, ${name}, ${poster})`
        return permintaan
    },
    putUpdateMovies: async (reqBody, columns, id) => {
        const permintaan = await database`UPDATE movies SET ${database(reqBody, columns)} WHERE id=${id} RETURNING id`
        return permintaan
    },
    deleteSelectedMovies: async (id) => {
        const permintaan = await database`DELETE FROM movies WHERE id=${id}`
        return permintaan
    },
}

module.exports = modelMovies