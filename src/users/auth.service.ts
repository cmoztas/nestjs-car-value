import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { User } from "./user.entity";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService
  ) {
  }

  async signup(user: CreateUserDto) {
    const users: User[] = await this.usersService.find(user.email);

    if (users.length) {
      throw new BadRequestException("User already exists");
    }

    const salt: string = randomBytes(8).toString("hex");
    const hash: Buffer = await (scrypt(user.password, salt, 32)) as Buffer;
    const result: string = salt + "." + hash.toString("hex");

    return await this.usersService.create({ email: user.email, password: result });
  }

  async signin(user: CreateUserDto) {
      const [foundUser]: User[] = await this.usersService.find(user.email);

      if (!foundUser) {
        throw new NotFoundException("User not found");
      }

      const [salt, storedHash]: string[] = foundUser.password.split(".");
      const hash: Buffer = (await scrypt(user.password, salt, 32)) as Buffer;

      if (storedHash !== hash.toString("hex")) {
        throw new BadRequestException("Bad password");
      }

      return foundUser;
  }
}
