'use strict';

//const bcrypt = require('bcrypt');

class PasswordHash {

    createHash(password) {
        //return bcrypt.hashSync(password, 10);
        return password;
    }

    compareHash(password, hash) {
        //return bcrypt.compareSync(password,hash);
        return password;
    }

}

module.exports = new PasswordHash();