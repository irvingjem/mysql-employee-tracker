require('dotenv').config();

// Connect to database
const db = mysql.createConnection({
        host: 'localhost',
        // Using dotenv for security and hiding passwords
        // Your MySQL username,
        user: process.env.DB_USER,
        // Your MySQL password
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
    console.log('Connected to the employee tracker database.')

);

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;