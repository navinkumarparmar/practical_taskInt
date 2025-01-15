const db = require('../config/db'); 
const createUsersTable = () => {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            first_name VARCHAR(255) NOT NULL,
            last_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            role ENUM('customer', 'admin') NOT NULL,
            isVerified BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error creating users table:', err.message);
        } else {
            console.log('Users table created successfully or already exists.');
        }
    });
};

module.exports = createUsersTable;


