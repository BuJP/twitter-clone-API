import { IBasicOutput } from "../models/index";
import { ITweet_likesOutput } from "models/tweet_likes";
const tweet_likess = require('../models/tweet_likes');

export class Tweet_likesServices{

    async getOne(idTweet:number, idUser:number): Promise<ITweet_likesOutput>{
        return await tweet_likess.findOne({
            where: {
                user: idUser,
                tweet: idTweet
            }
            
        })
    }

    async deleteOne(idLike:number): Promise<IBasicOutput>{
        const output : IBasicOutput = {
            httpCode: 200,
            message: "like has been deleted"
        }
        return await tweet_likess.destroy({where: {id:idLike}}).then(() =>{
            return output;
        }).catch(() =>{
            output.message = "An error has occurred while deleting the tweet";
            output.httpCode = 500
            return output;
        });
        
    }

    async addOne(idTweet:number, idUser:number): Promise<IBasicOutput>{
        const output : IBasicOutput = {
            httpCode: 201,
            message: "Like has been added"
        }
        return await tweet_likess.create({
            "user":idUser,
            "tweet":idTweet
        }).then(() =>{
            return  output
        }).catch(() =>{
            output.httpCode = 500;
            output.message = "An error has occurred while adding the like";
            return output;
        })
    }

    async countLikes(idTweet:number): Promise<number>{

        return await tweet_likess.count({
            where: {
                tweet:idTweet
            }
        })
    }

}