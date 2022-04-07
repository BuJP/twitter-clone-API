import {IUsersInput} from '../models/users';
import {IUsersOutput} from '../models/users';
const users = require('../models/users')

const db  =  require("../configs/database");


class UsersServices {

    // CREATE USER
    async createOne(input : IUsersInput) : Promise<IUsersOutput> {
        const newUser = await users.create(input);
        return newUser;
    }
    
}