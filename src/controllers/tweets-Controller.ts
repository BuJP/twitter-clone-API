import { ITweetsCreateInput, ITweetsCreateInputBody, ITweetsCreateOutput } from "../models/tweets";
import { TweetsServices } from "../services/tweetsServices";
import { Body, Controller, Get, Path, Post, Request, Route, Security, SuccessResponse, Tags } from "tsoa";
import { ITweet_commentsInput, ITweet_commentsInputBody, ITweet_commentsOutput } from "../models/tweet_comments";
import { IBasicOutput } from "../models/index";

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
    @Security("jwtOptional")
    @Get()
    public async getAllTweets(@Request() request: any) : Promise<ITweetsCreateOutput[]> {
        this.setStatus(200);
        return await new TweetsServices().getAll(request?.user?.id);
    }

    @Tags("Get tweet by id")
    @SuccessResponse("200", "OK")
    @Security("jwtOptional")
    @Get('{tweetId}')
    public async getOneTweet(@Path() tweetId: number,@Request() request: any) : Promise<ITweetsCreateOutput>{
        this.setStatus(200);
        return await new TweetsServices().getOne(tweetId, request?.user?.id);
    }

    @Tags("Add a like to a tweet")
    @SuccessResponse("201 | 200", "Added | Deleted")
    @Security("jwt")
    @Post('{tweetId}/liked')
    public async likedTweet(@Path() tweetId: number, @Request() request: any) :Promise<IBasicOutput>{
        return await new TweetsServices().liked(tweetId, request.user.id).then((output :IBasicOutput) => {
            this.setStatus(output.httpCode);
            return output;
        });
    }

    @Tags("Add a comment to a tweet")
    @SuccessResponse("201", "Added")
    @Security("jwt")
    @Post('{tweetId}/comment')
    public async commentTweet(@Path() tweetId: number, @Request() request: any, @Body() requestBody:ITweet_commentsInputBody) : Promise<ITweet_commentsOutput | IBasicOutput>{
        this.setStatus(201);
        const input : ITweet_commentsInput = {
            user: request.user.id,
            tweet: tweetId,
            comment: requestBody.comment
        }
        
        return await new TweetsServices().addComment(input).catch((output :IBasicOutput) => {
            return output;
        });
    }

}