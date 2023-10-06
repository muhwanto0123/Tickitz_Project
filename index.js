require("dotenv").config()
const express = require("express") //method express
const app = express()
const port = process.env.CLIENT_PORT
const database = require("./database.js")

app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/movies', async (req, res) => {
    try{
        const permintaan = await database`SELECT * FROM movies`
        res.json({
            status:true,
            pesan:"berhasil ditampilkan",
            data:permintaan
        })
    }catch(error){
        console.log(error)
    }
})

app.get('/movies/:id', async (req, res) => {
    const id = Number(req.params.id)
    const permintaan = await database`SELECT * FROM movies WHERE id=${id}`
    res.json({
        status:true,
        pesan:`data dengan ID : ${id} telah behasil ditampilkan`,
        data:permintaan
    })
})

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

app.put('/movies/:id', async(req, res) => {
    const id = Number(req.params.id)
    const {release_date, name, poster} = req.body
    const permintaan = await database`UPDATE movies SET release_date=${release_date}, name=${name}, poster=${poster} WHERE id=${id}`
    res.json({
        status:true,
        pesan:`Data dengan ID : ${id} berhasil di update`
    })
})

app.delete('/movies/:id/', async (req, res) => {
    const id = Number(req.params.id)
    const permintaan = await database`DELETE FROM movies WHERE id=${id}`
    res.json({
        status:true,
        pesan:`Data dengan id=${id} telah dihapus`
    })
})



app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})