export {};

const express = require('express');
const router = express.Router();
const hasher = require('../passhash')
const dbase = require('../data.config')
const User = require('../models/Users')
const controllers = require('../controller/userController')
const verifySignUp = require('../middleware/verifySignUp')
interface UserInterface{
    name: String,
    email: String,
    mobile: String,
    password: String
}


router.get('/', (req:any,res:any) => {
    res.send("Users")
});


// router.post('/add', (req:any,res:any) => {
//     let user: UserInterface = req.body
//     let hashPass: String = hasher.hashPassword(user.password)

//     User.findOne({
//         where: { email:user.email}
//     })
//     .then(
//     User.create({
//         name: user.name,
//         email:user.email,
//         mobile:user.mobile,
//         password:hashPass
//     })
//     .then(() => res.send("Inserted!"))
//     .catch((err:any) => console.log(err)))
//     .catch(() => res.status(400).send("Failed to Insert due to Duplicate Entry!"))

// })


router.post('/add', [ verifySignUp.checkDuplicateEmail], controllers.signup)

router.post('/login', controllers.signin)

module.exports = router;