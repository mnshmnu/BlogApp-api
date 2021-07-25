const Pool = require('pg').Pool
const hasher = require('./passhash')


const pool = new Pool({
  user: 'user',
  host: 'localhost',
  database: 'blogapp',
  password: 'resu',
  port: 5432,
})


const getUsers = (req: any, res: any) => {
    pool.query('SELECT * FROM users', (error: any, results: any) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
}

interface User{
  name: String,
  email: String,
  mobile: String,
  password: String
}

const createUser = (req: any, res: any) => {
    let user: User = req.body
    let hashPass: String = hasher.hashPassword(user.password)
    pool.query('INSERT INTO users (name, email, mobile, password) VALUES ($1, $2, $3, $4)', [user.name, user.email, user.mobile, hashPass], (error: any, results: any) => {
      if (error) {
        throw error
      }
      console.log(results.rows[0])
      res.status(201).send(`User added with ID: ${results[1]}`)
    })
}

module.exports = {
    getUsers,
    createUser    
}