import {Controller, Get,Post,SuccessResponse, Body,Route, Tags } from "tsoa";
import {IUsersOutput, IUsersInput, IUsersLogin, IUsersLoginOutput} from '../models/users';
import {UsersServices} from "../services/usersServices";

@Route("users")
export class usersController extends Controller {
    

    @SuccessResponse("201", "Created")  
    @Tags("Create user")
    @Post()
    public async createUser(@Body() requestBody : IUsersInput): Promise<IUsersOutput> {
        this.setStatus(201);
        const newUser = await new UsersServices().createOne(requestBody);
        return newUser;
    }

    @SuccessResponse("200", "OK")  
    @Tags("Login")
    @Post("login")
    public async login(@Body() requestBody : IUsersLogin): Promise<IUsersLoginOutput> {
        
        const output = await new UsersServices().login(requestBody);
        this.setStatus(output.httpCode);
        return output;
    }


    @Tags("Get all users")
    @Get()
    public async getAllUsers(): Promise<IUsersOutput[]>{
        const AllUsers = await new UsersServices().getAll();
        return AllUsers;
    }
}