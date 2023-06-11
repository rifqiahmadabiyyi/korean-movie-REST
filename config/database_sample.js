const mysql = require('mysql');
const koneksi = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: '',
    multipleStatements: true
});
koneksi.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});
module.exports = koneksi;