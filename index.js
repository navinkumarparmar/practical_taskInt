const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const db = require('./src/config/db')
const createUsersTable = require('./src/models/userModel')
createUsersTable()
const routes = require('./src/routes/index')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//import routes main index file
app.use('/api',routes)
const PORT = process.env.PORT

app.get('/',(req,res)=>{
    res.send("start")
})

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})