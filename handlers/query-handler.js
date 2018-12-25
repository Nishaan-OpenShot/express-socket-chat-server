
'use strcit';
const mongodb = require('mongodb');

class Queryhandler {
    constructor() {

    }

    /*
    Name of the Method : registerUser
    Description : register the User
    Parameter : 
          1) data query object for MongoDB
    Return : Promise 
    */

    registerUser(data) {
        return new Promise(async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.mongodb.onConnect();
                DB.collection('users').insertOne(data, (err, result) => {
                    DB.close();
                    if(err) {
                        reject(err);
                    }
                    resolve(result);
                });
            } catch(error) {
                reject(error);
            }
        });
    }

    userNameCheck(data) {
        return new Promise( async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.mongodb.onConnect();
                DB.collection('users').find(data).count((error, result) => {
                    DB.close();
                    if(error) {
                        reject(error);
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    userSessionCheck(data) {
        return new Promise( async (resolve, reject) => {
            try {
                const [DB, ObjectID] = await this.mongodb.onConnect
                DB.collection('users').findOne({_id: ObjectID(data.userId), online:'Y'}, (err, result) => {
                    DB.close();
                    if(err) {
                        resject(err);
                    }
                    resolve(result);
                });
            } catch(error) {
                reject(error);
            }
        });
    }

}

module.exports = new Queryhandler();