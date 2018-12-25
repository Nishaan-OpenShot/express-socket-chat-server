
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
                const [DB, ObjectID] = await this.mongodb.onConnect();
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
    
    getUserInfo({userId,socketId = false}) {
        let queryProjection = null;
        if(socketId){
            queryProjection = {
                "socketId" : true
            }
        } else {
            queryProjection = {
                "username" : true,
                "online" : true,
                '_id': false,
                'id': '$_id'
            }
        }
        return new Promise( async (resolve, reject) => {
            try {
                const [DB,ObjectID] = await this.Mongodb.onConnect();
                DB.collection('users').aggregate([{
                    $match:  {
                        _id : ObjectID(userId)
                    }
                },{
                    $project : queryProjection
                }
                ]).toArray( (err, result) => {
                    DB.close();
                    if( err ){
                        reject(err);
                    }
                    socketId ? resolve(result[0]['socketId']) : resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        });
    }
    
    addSocketId({userId, socketId}) {
		const data = {
			id : userId,
			value : {
				$set :{
					socketId : socketId,
					online : 'Y'
				}
			}
		};
		return new Promise( async (resolve, reject) => {
			try {
				const [DB, ObjectID] = await this.Mongodb.onConnect();
				DB.collection('users').update( { _id : ObjectID(data.id)}, data.value ,(err, result) => {
					DB.close();
					if( err ){
						reject(err);
					}
					resolve(result);
				});
			} catch (error) {
				reject(error)
			}
		});
    }
    
    getChatList(userId){
        return new Promise( async (resolve, reject) => {
            try {
                const [DB,ObjectID] = await this.Mongodb.onConnect();
                DB.collection('users').aggregate([{
                    $match: {
                        'socketId': { $ne : userId}
                    }
                },{
                    $project:{
                        "username" : true,
                        "online" : true,
                        '_id': false,
                        'id': '$_id'
                    }
                }
                ]).toArray( (err, result) => {
                    DB.close();
                    if( err ){
                        reject(err);
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        });
    }

}

module.exports = new Queryhandler();