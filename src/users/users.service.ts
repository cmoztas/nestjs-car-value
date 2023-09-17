import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>
  ) {
  }

  create(user: CreateUserDto): Promise<User> {
    const createdUser: User = this.repo.create({
      email: user.email,
      password: user.password
    });

    return this.repo.save(createdUser);
  }
}
