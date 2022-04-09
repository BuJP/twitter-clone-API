import { DataTypes} from "sequelize";
const db  =  require("../configs/database");


interface ITweet_comments {
    id : number;
    user : number; // FK
    tweet : number; // FK
    comment : string ;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface ITweet_commentsInput extends Pick<ITweet_comments, 'user' | 'tweet' | 'comment'>{};
export interface ITweet_commentsInputBody extends Omit<ITweet_commentsInput, 'user' | 'tweet'>{};

export interface ITweet_commentsOutput extends Required<ITweet_comments>{};

const tweet_comments = db.define('tweet_comments',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    comment:{
        type: new DataTypes.STRING,
        allowNull: false,
    }
})
module.exports =  tweet_comments;
