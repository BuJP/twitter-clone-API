import { DataTypes} from "sequelize";
const db  =  require("../configs/database");

interface ITweets {
    id : number;
    author : number; // FK 
    content ?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

const tweets = db.define('tweets',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content:{
        type: new DataTypes.STRING,
        allowNull: true,
    },
    
    
})
module.exports =  tweets;