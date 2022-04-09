import { IBasicOutput } from "../models/index";
import { ITweet_commentsInput, ITweet_commentsOutput } from "../models/tweet_comments";
const tweet_comments = require('../models/tweet_comments');

export class tweet_commentsServices{


    async createOne(input : ITweet_commentsInput) : Promise<ITweet_commentsOutput | IBasicOutput>{
        return await tweet_comments.create(input).then((result : ITweet_commentsOutput) =>{
            return result;
        }).catch(()=>{
            const output : IBasicOutput = {
                httpCode: 500,
                message: "An error has occurred while adding the comment"
            }
            return output;
        });   
  
    }


}