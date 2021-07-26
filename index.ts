import express from "express";
const db = require('./src/queries')
const dbase = require('./src/data.config')
var cors = require('cors');

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const PORT = process.env.PORT || 5000

app.use(cors());

dbase.sequelize.authenticate()
.then(() => console.log("Database Connected"))
.catch((err:string) => console.log("Error: "+err))

app.get('/', (req,res) => {
    res.send("Homepage will go here!")
})
app.get('/getUsers', db.getUsers)
app.post('/createUser', db.createUser)

// User Routes
app.use('/users', require('./src/routes/users'))
app.use('/blogs', require('./src/routes/blogs'))


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})