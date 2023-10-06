const express = require("express") //method express
const app = express()
const port = 3000
const database = require("./database.js")

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.post('/movies', async (req, res) => {
    try {
        const { release_date, name, poster } = req.body;
        
        // // Validasi data sebelum operasi INSERT
        // if (!release_date || !name || !poster) {
        //     return res.status(400).json({
        //         status: false,
        //         pesan: "Data tidak lengkap. Semua field harus diisi."
        //     });
        // }

        // // Cek apakah data yang sama sudah ada dalam database sebelum INSERT
        // const existingData = await database`SELECT * FROM movies WHERE name = ${name}`;
        // if (existingData.length > 0) {
        //     return res.status(400).json({
        //         status: false,
        //         pesan: "Data dengan nama yang sama sudah ada dalam database."
        //     });
        // }

        // Lakukan operasi INSERT setelah validasi
        const permintaan = await database`INSERT INTO movies (release_date, name, poster) VALUES (${release_date}, ${name}, ${poster})`;

        res.json({
            status: true,
            pesan: "Data telah ditambahkan."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: false,
            pesan: "Terjadi kesalahan dalam server."
        });
    }
});


app.listen(port, () => {
    console.log(`example app listening ${port}`)
})