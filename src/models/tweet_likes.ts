import { DataTypes} from "sequelize";
const db  =  require("../configs/database");


interface ITweet_likes{
    user : number; // FK
    tweet : number; // FK
    createdAt?: Date;
    updatedAt?: Date;
}

const tweet_likes = db.define('tweet_likes',{})
module.exports =  tweet_likes;
