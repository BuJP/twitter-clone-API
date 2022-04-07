import { DataTypes} from "sequelize";
const db  =  require("../configs/database");

interface ITweet_medias {
    id : number;
    tweet : number; // FK
    media : string;
    createdAt?: Date;
    updatedAt?: Date;
}

const tweet_medias = db.define('tweet_medias',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    media : {
        type: new DataTypes.STRING,
        allowNull: true,
    }
})
module.exports =  tweet_medias;
