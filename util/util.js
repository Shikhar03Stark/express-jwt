const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    h_pass = await bcrypt.hash(password, 10)
    return await h_pass;
}

const isValidPassword = async (password, value) => {
    return await bcrypt.compare(password, value);
}

module.exports.hashPassword = hashPassword;
module.exports.isValidPassword = isValidPassword;