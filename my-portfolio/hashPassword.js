// hashPassword.js
const bcrypt = require('bcryptjs');
const password = 'admin123'; // <-- Change this to your password
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, salt);
console.log(hash);