import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,

  ) {
  }

  create(user: CreateUserDto): Promise<User> {
    const createdUser: User = this.repo.create({
      email: user.email,
      password: user.password
    });

    return this.repo.save(createdUser);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.repo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("user not found");
    }
    return user;
  }

  async find(email: string): Promise<User[]> {
    const user = await this.repo.find({ where: { email } });
    if (!user) {
      throw new NotFoundException("user not found");
    }
    return user;
  }

  async update(id: number, attrs: Partial<User>): Promise<User> {
    const user: User = await this.findOne(id);

    if (!user) {
      throw new NotFoundException("user not found");
    }

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number): Promise<User> {
    const user: User = await this.findOne(id);
    if (!user) {
      throw new NotFoundException("user not found");
    }
    return this.repo.remove(user);
  }
}
