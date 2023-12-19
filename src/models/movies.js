const database = require("../../database");

const modelMovies = {
  getAllMovies: async () => {
    const permintaan = await database`SELECT * FROM movies`;
    return permintaan;
  },
  getIDMovies: async (id) => {
    const permintaan = await database`SELECT * FROM movies WHERE id=${id}`;
    return permintaan;
  },
  postAddMovies: async (data_Add) => {
    const {
      name,
      release_date,
      duration,
      genres,
      directed_by,
      casts,
      synopsys,
      poster,
    } = data_Add;
    const permintaan =
      await database`INSERT INTO movies (name, release_date, duration, genres, directed_by, casts, synopsys, poster) VALUES (${name}, ${release_date}, ${duration}, ${genres}, ${directed_by}, ${casts}, ${synopsys}, ${poster}) RETURNING id`;
    return permintaan;
  },
  putUpdateMovies: async (payload, id) => {
    const {
      name,
      release_date,
      duration,
      genres,
      directed_by,
      casts,
      synopsys,
      poster,
    } = payload;
    const request = await database`UPDATE movies
      SET name = ${name},
      release_date = ${release_date},
      duration = ${duration},
      genres =${genres},
      directed_by =${directed_by},
      casts =${casts},
      synopsys=${synopsys},
      poster=${poster}
      WHERE id = ${id};`;
    return request;
  },
  deleteSelectedMovies: async (id) => {
    const permintaan = await database`DELETE FROM movies WHERE id=${id}`;
    return permintaan;
  },
};

module.exports = modelMovies;
