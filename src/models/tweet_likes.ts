import { DataTypes} from "sequelize";
const db  =  require("../configs/database");


interface ITweet_likes{
    id : number;
    user : number; // FK
    tweet : number; // FK
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ITweet_likesOutput extends Required<ITweet_likes> {};

const tweet_likes = db.define('tweet_likes',{})
module.exports =  tweet_likes;
