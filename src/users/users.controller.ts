import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { SerializeInterceptor } from "../interceptors/serialize.interceptor";
import { UserDto } from "./dtos/user.dto";

@Controller("auth")
export class UsersController {
  constructor(
    private usersService: UsersService
  ) {
  }

  @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get("/:id")
  findUser(@Param("id") id: string): Promise<User> {
    console.log('handler is running');
    return this.usersService.findOne(+id);
  }

  @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get()
  findAllUsers(@Query("email") email: string): Promise<User[]> {
    return this.usersService.find(email);
  }

  @Post("/signup")
  createUser(@Body() body: CreateUserDto): void {
    void this.usersService.create(body);
  }

  @Patch("/:id")
  updateUser(@Param("id") id: string, @Body() body: UpdateUserDto): Promise<User> {
    return this.usersService.update(+id, body);
  }

  @Delete("/:id")
  removeUser(@Param("id") id: string): Promise<User> {
    return this.usersService.remove(+id);
  }
}
