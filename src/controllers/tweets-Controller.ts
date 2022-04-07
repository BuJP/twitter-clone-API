import { ITweetsCreateInput, ITweetsCreateInputBody, ITweetsCreateOutput } from "../models/tweets";
import { TweetsServices } from "../services/tweetsServices";
import { Body, Controller, Get, Path, Post, Request, Route, Security, SuccessResponse, Tags } from "tsoa";

@Route("tweets")
export class tweetsController extends Controller {

    @SuccessResponse("201", "Created")  
    @Tags("Create tweet")
    @Security("jwt")
    @Post()
    public async createTweet(@Body() requestBody : ITweetsCreateInputBody, @Request() request: any): Promise<ITweetsCreateOutput> {
        this.setStatus(201);

        const input : ITweetsCreateInput = {
            author: request.user.id,
            content: requestBody.content
        }
        const newTweet = await new TweetsServices().createOne(input);
        return newTweet;
    }

    @Tags("Get all tweets")
    @SuccessResponse("200", "OK")
    @Get()
    public async getAllTweets() : Promise<ITweetsCreateOutput[]> {
        return await new TweetsServices().getAll();
    }

    @Tags("Get tweet by id")
    @SuccessResponse("200", "OK")
    @Get('{tweetId}')
    public async getOneTweet(@Path() tweetId: number,) : Promise<ITweetsCreateOutput>{
        return await new TweetsServices().getOne(tweetId);
    }

}