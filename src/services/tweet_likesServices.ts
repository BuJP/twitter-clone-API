
const tweet_likess = require('../models/tweet_likes');

export class Tweet_likesServices{

    async getOne(idTweet:number, idUser:number){
        return await tweet_likess.findOne({
            user: idUser,
            tweet: idTweet
        })
    }

    async deleteOne(idLike:number){
        return await tweet_likess.destroy({where: {id:idLike}}).then(() =>{
            return {
                "httpCode": 200,
                "message" : "like has been deleted"
            }
        }).catch(() =>{
            return {
                "httpCode":500,
                "message":"An error has occurred while deleting the tweet"
            }
        });
        
    }

    async addOne(idTweet:number, idUser:number){
        return await tweet_likess.create({
            "user":idUser,
            "tweet":idTweet
        }).then(() =>{
            return {
                "httpCode":201,
                "message":"Like has been added"
            }
        }).catch(() =>{
            return {
                "httpCode":500,
                "message":"An error has occurred while adding the like"
            }
        })
    }

}