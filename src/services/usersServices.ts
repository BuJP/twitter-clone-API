import {IUsersInput,IUsersLogin,IUsersOutput, IUsersLoginOutput} from '../models/users';
const jwt = require("jsonwebtoken");
require('dotenv').config();

const users = require('../models/users')




export class UsersServices {

    // CREATE USER
    async createOne(input : IUsersInput) : Promise<IUsersOutput> {
        const newUser = await users.create(input);
        return newUser;
    }

    async login(input : IUsersLogin) : Promise<IUsersLoginOutput>{

        const user = await users.findOne({
            where: {email: input.email}
        });
        
        const output : IUsersLoginOutput = {
            message: 'Bad credentials',
            httpCode: 401
        }

        if(!user){
            // USER NOT FOUND
            return output;
        }

        else if(!await user.validPassword(input.password)) {
            // WRONG PASSWORD
            return output;
        }

        // GENERATE JWT TOKEN
        output.httpCode = 200;
        output.message = "Connected";
        output.token = this.generateToken(user.email, user.id);
        output.name = user.name;
        output.profile_picture = user.profile_picture;

        return output;
    }

    generateToken(user_email: string, user_id : number){
        const payload = {
            id : user_id,
            email: user_email,
            
        }
    
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1hr'})
        
    }

    async getAll():Promise<IUsersOutput[]>{
        
        const allUsers = users.findAll({});
        return allUsers;
    }
    
}