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

  findOne(id: number): Promise<User> {
    return this.repo.findOneBy({ id });
  }

  find(email: string): Promise<User[]> {
    return this.repo.find({ where: { email } });
  }

  async update(id: number, attrs: Partial<User>): Promise<User> {
    const user: User = await this.findOne(id);

    if (!user) {
      throw new Error("user not found");
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number): Promise<User> {
    const user: User = await this.findOne(id);
    if (!user) {
      throw new Error("user not found");
    }
    return this.repo.remove(user);
  }
}
