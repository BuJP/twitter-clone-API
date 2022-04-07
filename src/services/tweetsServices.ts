import { ITweetsCreateInput, ITweetsCreateOutput } from "models/tweets";

const tweets = require('../models/tweets');

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
}