import { DataTypes} from "sequelize";
const db  =  require("../configs/database");

interface ITweets {
    id : number;
    author : number; // FK 
    content : string ;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ITweetsCreateInput extends Pick<ITweets, 'author' | 'content'>{}
interface ITweetsCreateInputBody extends Omit<ITweetsCreateInput, 'author'>{}

interface ITweetsCreateOutput extends Required<ITweets>{}


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
export {
    ITweetsCreateInput,
    ITweetsCreateInputBody,
    ITweetsCreateOutput
}