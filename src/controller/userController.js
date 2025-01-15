const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

module.exports.registerCustomer = async function (req, res, next) {
    const { firstName, lastName, email, password } = req.body;

    try {

        const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).send('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.promise().query(
            `INSERT INTO users (first_name, last_name, email, password, role, isVerified) VALUES (?, ?, ?, ?, 'customer', false)`,
            [firstName, lastName, email, hashedPassword]
        );
    // Generate a verification token
    const token = jwt.sign({ userId: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const verificationLink = `${process.env.baseurl}/user/verifyEmail/${token}`;

    // Send the email with the verification link
    sendEmail(email, 'Verify Your Email', `Please verify your email by clicking the link: ${verificationLink}`);

        res.status(201).send('Customer registered successfully. Please verify your email.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};

// Register Admin
module.exports.registerAdmin = async function (req, res, next) {
    const { firstName, lastName, email, password } = req.body;

    try {

        const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).send('Email already registered');
        }
        const hashedPassword = await bcrypt.hash(password, 10);


        const [result] =  await db.promise().query(
            `INSERT INTO users (first_name, last_name, email, password, role, isVerified) VALUES (?, ?, ?, ?, 'admin', false)`,
            [firstName, lastName, email, hashedPassword]
        );

  
          const token = jwt.sign({ userId: result.insertId }, process.env.JWT_SECRET, { expiresIn: '1h' });

          const verificationLink = `${process.env.baseurl}/user/verifyEmail/${token}`;
  
        
          sendEmail(email, 'Verify Your Email', `Please verify your email by clicking the link: ${verificationLink}`);
  

        res.status(201).send('Admin registered successfully. Please verify your email.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
};





module.exports.verifyEmail = async function (req, res, next) {
    const { token } = req.params;  

    try {
     
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        const [user] = await db.promise().query('SELECT * FROM users WHERE id = ?', [decoded.userId]);

        if (!user) {
            return res.status(400).send('Invalid verification token');
        }

        // Mark the user as verified
        await db.promise().query('UPDATE users SET isVerified = true WHERE id = ?', [decoded.userId]);

        res.status(200).send('Email successfully verified! You can now log in.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Invalid or expired token');
    }
};
