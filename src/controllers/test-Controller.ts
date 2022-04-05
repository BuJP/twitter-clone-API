import { Get, Route, Tags } from "tsoa";

@Route("")
export class UsersController {
  @Get()
  @Tags("Test")
  public async test(): Promise<string> {
    return "Hello world !";
  }
}