const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.adminLogin = async function (req, res, next) {
    const { email, password } = req.body;

    try {
       
        const [user] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(404).send('User not found');
        }

     
        if (user[0].role !== 'admin') {
            return res.status(403).send('You are not allowed to login from here');
        }

 
        const isPasswordMatch = await bcrypt.compare(password, user[0].password);
        if (!isPasswordMatch) {
            return res.status(401).send('Invalid password');
        }

        const token = jwt.sign({ id: user[0].id, role: user[0].role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).send({ message: 'Login successful', token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};
