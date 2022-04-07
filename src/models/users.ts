import { DataTypes, Optional} from "sequelize";
const db  =  require("../configs/database");

interface IUsers {
    id : number;
    name : string;
    email : string;
    profile_picture ?: string | null ;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUsersInput extends Optional<IUsers, 'id'>{}
export interface IUsersOutput extends Required<IUsers>{}

const users = db.define('users',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    email:{
        type: new DataTypes.STRING(320),
        allowNull: false,
    },
    profile_picture:{
        type: new DataTypes.STRING,
        allowNull: true,
    },
    
})
module.exports =  users;
