import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

@Controller("auth")
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {
  }

  @Post("/signup")
  createUser(@Body() body: CreateUserDto): void {
    void this.usersService.create(body);
  }

  @Get('/:id')
  findUser(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Get()
  findAllUsers(@Query('email') email: string): Promise<User[]> {
    return this.usersService.find(email);
  }
}
