import { ITweet_commentsInput, ITweet_commentsOutput } from "../models/tweet_comments";
import { IBasicOutput } from "../models/index";
import { ITweetsCreateInput, ITweetsCreateOutput } from "../models/tweets";

const tweets = require('../models/tweets');
const tweet_comments = require('../models/tweet_comments');
const users = require('../models/users')


import { Tweet_likesServices } from "./tweet_likesServices";
import { tweet_commentsServices } from "./tweet_commentsServices";


export class TweetsServices {
    
    async createOne(input : ITweetsCreateInput) : Promise<ITweetsCreateOutput> {
        console.log(input);
        const newTweet = await tweets.create(input);   
        return newTweet;
    }

    async getAll(idUser:number | null, page : number, size : number) : Promise<ITweetsCreateOutput[]> {
        const allTweets = await tweets.findAll({
            attributes:["id", 
            "content",
            "createdAt"
            ],
            include:[{
                model:users,
                as:"tweetAuthor",
                attributes:["id","name","profile_picture"]
            },{
                model: tweet_comments,
                attributes:["id", "comment", "user", "createdAt"],
                order: [['createdAt', 'DESC']],
                include: [{
                    model:users,
                    as:"commentAuthor",
                    attributes:["id","name","profile_picture"]
                }],
                limit: 2
            }],
            offset: page * size,
            limit: size
        });

            
        for(var tweet of allTweets) {            
            const likesCount = await new Tweet_likesServices().countLikes(tweet.id)
            tweet.setDataValue("likesCount", likesCount)
            if(idUser){
                const like = await new Tweet_likesServices().getOne(tweet.id,idUser)
                tweet.setDataValue("userHasLiked",like ? true : false);
            }
        }
        
        return allTweets;
    }


    async getOne(id : number, idUser:number | null) : Promise<ITweetsCreateOutput> {
        console.log(idUser)
        let tweet = await tweets.findOne({
            where :{id: id},
            attributes:["id", 
                "content",
                "createdAt"
                
            ],
            include:[{
                model:users,
                as:"tweetAuthor",
                attributes:["id","name","profile_picture"]
            },{
                model: tweet_comments,
                attributes:["id", "comment", "user", "createdAt"],
                order: [['createdAt', 'DESC']],
                include: [{
                    model:users,
                    as:"commentAuthor",
                    attributes:["id","name","profile_picture"]
                }]
            }],
            
            
        })
        if(!tweet){
            // NOT FOUND
        }
        
        const likesCount = await new Tweet_likesServices().countLikes(id)
        tweet.setDataValue("likesCount", likesCount)
        
        if(idUser){
            const like = await new Tweet_likesServices().getOne(id,idUser)
            tweet.setDataValue("userHasLiked",like ? true : false);
        }


        return tweet;
    }

    async liked(idTweet : number, idUser : number ) : Promise<IBasicOutput> {
        const tweet = this.getOne(idTweet, null);

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

    async addComment(input : ITweet_commentsInput) : Promise<ITweet_commentsOutput | IBasicOutput>{
        return await new tweet_commentsServices().createOne(input);
    }
}