import { DataTypes} from "sequelize";
const bcrypt = require('bcrypt');
const db  =  require("../configs/database");

interface IUsers {
    id : number;
    name : string;
    email : string;
    password : string;
    profile_picture ?: string | null ;
    createdAt?: Date;
    updatedAt?: Date;
}

interface IUsersInput extends Pick<IUsers, 'name' | 'email' | 'password'>{}
interface IUsersOutput extends Required<IUsers>{}

interface IUsersLogin extends Pick<IUsers, 'email' | 'password'>{}
interface IUsersLoginOutput {
    message: string;
    httpCode:number;
    token?: string;
    name?: string;
    profile_picture?: string | null
}

const users = db.define('users',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name:{
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING(320),
        allowNull: false,
        unique: true,
    },
    password:{
        type: DataTypes.STRING(),
        allowNull: false,


    },
    profile_picture:{
        type: DataTypes.STRING,
        allowNull: true,
    }
 
})

users.beforeCreate(async (user : IUsers)=> {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt)
})

users.prototype.validPassword = async function (password : string){
    return await bcrypt.compare(password, this.password);
}

module.exports =users;
export {
    IUsersOutput,
    IUsersInput,
    IUsersLogin,
    IUsersLoginOutput
};
