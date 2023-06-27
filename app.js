const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./config/database');
const app = express();
const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// post data
app.post('/api/movies', (req, res) => {
    const data = { ...req.body };
    const querySql = 'INSERT INTO films SET ?';

    connection.query(querySql, data, (err, rows, field) => {
        if (err) {
            return res.status(500).json({ message: 'Data not inserted!', error: err });
        }
        res.status(201).json({ success: true, message: 'Data has been inserted!' });
    });
});

// read data / get data film
app.get('/api/movies', (req, res) => {
    const querySql = 'SELECT * FROM films';


    connection.query(querySql, (err, rows, field) => {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        res.status(200).json({ success: true, data: rows });
    });
});

// read data / get data aktor film
app.get('/api/actors', (req, res) => {
    const querySql = 'SELECT * FROM actors';

    connection.query(querySql, (err, rows, field) => {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        res.status(200).json({ success: true, data: rows });
    });
});

// update data
app.put('/api/movies/:id', (req, res) => {
    const data = { ...req.body };
    const querySearch = 'SELECT * FROM films WHERE id = ?';
    const queryUpdate = 'UPDATE films SET ? WHERE id = ?';

    connection.query(querySearch, req.params.id, (err, rows, field) => {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        if (rows.length) {
            connection.query(queryUpdate, [data, req.params.id], (err, rows, field) => {
                if (err) {
                    return res.status(500).json({ message: 'Ada kesalahan', error: err });
                }

                res.status(200).json({ success: true, message: 'Data has been updated!' });
            });
        } else {
            return res.status(404).json({ message: 'Data not found!', success: false });
        }
    });
});


app.get('/api/movies/:id', (req, res) => {
    const data = { ...req.body };
    const querySearch = 'SELECT * FROM films WHERE id = ?';
    const releaseYearQuery = 'SELECT * FROM films WHERE release_year = ?';
    const directorQuery = 'SELECT * FROM films WHERE director LIKE ?';
    const titleQuery = 'SELECT * FROM films WHERE title LIKE ?';

    if (!isNaN(req.params.id)) {
        connection.query(querySearch, req.params.id, (err, rows, field) => {
            if (err) {
                return res.status(500).json({ message: 'Ada kesalahan', error: err });
            }

            if (rows.length) {
                res.status(200).json({ success: true, data: rows });
            } else {
                return res.status(404).json({ message: 'Data not found!', success: false });
            }
        });
    } else if (req.params.id.toLowerCase() === 'release_year') {
        const releaseYear = parseInt(req.query.value);
        if (isNaN(releaseYear)) {
            return res.status(400).json({ message: 'Invalid release year format!', success: false });
        }

        connection.query(releaseYearQuery, releaseYear, (err, rows, field) => {
            if (err) {
                return res.status(500).json({ message: 'Ada kesalahan', error: err });
            }

            if (rows.length) {
                res.status(200).json({ success: true, data: rows });
            } else {
                return res.status(404).json({ message: 'Data not found!', success: false });
            }
        });
    } else if (req.params.id.toLowerCase() === 'director') {
        const director = '%' + req.query.value + '%';

        connection.query(directorQuery, director, (err, rows, field) => {
            if (err) {
                return res.status(500).json({ message: 'Ada kesalahan', error: err });
            }

            if (rows.length) {
                res.status(200).json({ success: true, data: rows });
            } else {
                return res.status(404).json({ message: 'Data not found!', success: false });
            }
        });
    } else if (req.params.id.toLowerCase() === 'title') {
        const title = '%' + req.query.value + '%';
        connection.query(titleQuery, title, (err, rows, field) => {
            if (err) {
                return res.status(500).json({ message: 'Ada kesalahan', error: err });
            }

            if (rows.length) {
                res.status(200).json({ success: true, data: rows });
            } else {
                return res.status(404).json({ message: 'Data not found!', success: false });
            }
        });   
    }
    
    else {
        return res.status(400).json({ message: 'Invalid search criteria!', success: false });
    }
});


// delete data
app.delete('/api/movies/:id', (req, res) => {
    const querySearch = 'SELECT * FROM films WHERE id = ?';
    const queryDelete = 'DELETE FROM films WHERE id = ?';

    connection.query(querySearch, req.params.id, (err, rows, field) => {
        if (err) {
            return res.status(500).json({ message: 'Ada kesalahan', error: err });
        }

        if (rows.length) {
            connection.query(queryDelete, req.params.id, (err, rows, field) => {
                if (err) {
                    return res.status(500).json({ message: 'Ada kesalahan', error: err });
                }

                res.status(200).json({ success: true, message: 'Data has been deleted!' });
            });
        } else {
            return res.status(404).json({ message: 'Data not found!', success: false });
        }
    });
});



app.listen(PORT, () => console.log(`Server running at port :${PORT}`));