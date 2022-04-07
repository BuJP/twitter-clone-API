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
