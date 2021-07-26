

const User = require('../models/Users')
interface UserInterface{
    name: String,
    email: String,
    mobile: String,
    password: String
}



let checkDuplicateEmail = (req:any, res:any, next:any) => {
    let user: UserInterface = req.body
    User.findOne({
        where: { email:user.email}
    })
    .then( (user:any) => {
        if (user){
            res.status(400).send({
                message: "Failed! Email is already in use!"
            })
            return;
        }

        next();
    })
}



const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
  };
  
module.exports = verifySignUp;