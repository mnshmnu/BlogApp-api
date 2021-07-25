/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
const db = require('./queries')
var cors = require('cors');

dotenv.config();

/**
 * App Variables
 */
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
const PORT = process.env.PORT || 5000


/**
 *  App Configuration
 */
app.use(express.json());
app.use(cors());



/**
 *  Api Endpoints
 */
app.get('/', (req,res) => {
    res.send("Homepage will go here!")
})

app.get('/users', db.getUsers)
app.post('/createuser', db.createUser)

/**
 * Server Activation
 */
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})