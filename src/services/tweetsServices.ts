import { ITweetsCreateInput, ITweetsCreateOutput } from "models/tweets";

const tweets = require('../models/tweets');

import { Tweet_likesServices } from "./tweet_likesServices";

export class TweetsServices {
    
    async createOne(input : ITweetsCreateInput) : Promise<ITweetsCreateOutput> {
        console.log(input);
        const newTweet = await tweets.create(input);   
        return newTweet;
    }

    async getAll() : Promise<ITweetsCreateOutput[]> {
        const allTweets = await tweets.findAll({});
        return allTweets;
    }


    async getOne(id : number) : Promise<ITweetsCreateOutput> {
        const tweet = await tweets.findOne({
            id: id
        })

        return tweet;
    }

    async liked(idTweet : number, idUser : number) {
        const tweet = this.getOne(idTweet);

        // ERROR TWEET DOES NOT EXIST
        if(!tweet) return {
            "httpCode": 400,
            "message" : "Tweet not found"
        }

        const isAlreadyLiked = await new Tweet_likesServices().getOne(idTweet, idUser);

        // IF EXIST DELETE LIKED
        if(isAlreadyLiked){
            return await new Tweet_likesServices().deleteOne(isAlreadyLiked.id);
        }

        
        return await new Tweet_likesServices().addOne(idTweet, idUser)
    }
}