/* eslint-disable camelcase */
const database = require('../../database')

const modelCinemas = {
  getAllcinemas: async () => {
    const request = await database`SELECT * FROM cinemas`
    return request
  },

  getSelectedCinemas: async (id) => {
    const request = await database`SELECT * FROM cinemas where id = ${id}`
    return request
  },

  postCinemas: async (payload) => {
    const {
      name,
      city,
      address,
      show_times,
      price,
      logo,
      movie_id
    } = payload

    const request = await database`INSERT INTO cinemas(name,city,address,show_times,price,logo, movie_id)
        VALUES(${name},${city},${address},${show_times},${price},${logo}, ${movie_id}) RETURNING id`

    return request
  },

  editCinemas: async (id, payload) => {
    const {
      name,
      city,
      address,
      show_times,
      price,
      logo,
      movie_id,
    } = payload

    const request = await database`UPDATE cinemas
        SET name = ${name},
            city =${city},
            address =${address},
            show_times = ${show_times},
            price = ${price},
            logo = ${logo},
            movie_id = ${movie_id}
        WHERE id = ${id};`
    return request
  },

  deleteCinemas: async (id) => {
    const request = await database`DELETE FROM cinemas WHERE id = ${id};`

    return request
  }

}

module.exports = modelCinemas
