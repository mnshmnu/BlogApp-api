import bcrypt from 'bcrypt';
const saltRounds = 10;

function hashPassword(password: string): String{
    const passwordHash = bcrypt.hashSync(password, 10);
    return passwordHash
}

function comparePassword(password: string, hash: string): boolean{
    let isSame:boolean = bcrypt.compareSync(password, hash);
    return isSame
}


module.exports = {
    hashPassword,
    comparePassword
}