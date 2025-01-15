const nodemailer = require('nodemailer');
console.log("process.env.password",process.env.password)

const transporter = nodemailer.createTransport({
    service: 'Gmail',  // Gmail service
    auth: {
        user: process.env.email,  
        pass: process.env.password    
    }
});

const sendEmail = async(to, subject, text) => {
    const mailOptions = {
        from: process.env.email,
        to: to,
        subject: subject,
        text: text
    };

    try {
        
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (err) {
      console.log("err",err)
        console.error('Error sending email:', err.message);
  
    }

};

module.exports = sendEmail;
