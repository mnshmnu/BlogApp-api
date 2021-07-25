import bcrypt from 'bcrypt';
const saltRounds = 10;

function hashPassword(password: string): String{
    const passwordHash = bcrypt.hashSync(password, 10);
    return passwordHash
}


// const passwordhash = (password) => {
//     const passwordHash = bcrypt.hashSync(password, 10);
//     return passwordHash
// }

module.exports = {
    hashPassword,
}