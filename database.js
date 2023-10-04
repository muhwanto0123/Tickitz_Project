const postgres = require("postgres")

const sql = postgres ({
    host:"localhost",
    user:"postgres",
    pass:"admin123",
    database:"tickitz_cinema",
    port:5432,
})

module.exports = sql