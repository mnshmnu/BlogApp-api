export {};

require("dotenv").config();

const User = require('../models/Users')
const hasher = require('../passhash')
var jwt = require("jsonwebtoken");


interface UserInterface{
    name: string,
    email: string,
    mobile: string,
    password: string
}

interface UserQueried extends UserInterface{
    id: number,
    createdAt: any,
    updatedAt: any
}

interface SignInDetail{
    email: string,
    password: string,
}




exports.signup = (req:any, res:any) => {
    let user: UserInterface = req.body
    let hashPass: string = hasher.hashPassword(user.password)
    User.create({
        name: user.name,
        email:user.email,
        mobile:user.mobile,
        password:hashPass
    })
    .then(() => res.send({
        message: "User Registered Successfully"
    }))
    .catch((err:any) => console.log(err))
}


exports.signin = (req:any, res:any) => {
    let signInDetail: SignInDetail = req.body
    User.findOne({
        where: {
            email: signInDetail.email
        }})
        .then((user:UserQueried) => {
            if (!user) {
                return res.status(404).send({
                    message: "User not Found!"
                });
            }
            let isValidPassword:boolean = hasher.comparePassword(signInDetail.password,user.password)

            if (!isValidPassword){
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            let token:string = jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.SECRET_ACCESS_TOKEN,{
                expiresIn: 86400 //24Hrs
            })
            
            res.status(200).send({
                id: user.id,
                name:user.name,
                email: user.email,
                mobile: user.mobile,
                token: token
            })


        })
        .catch((err:any) => {
            console.log(err)
        })
}