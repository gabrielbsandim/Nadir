import { EntityRepository, Repository, getRepository } from 'typeorm';

import IUserRepository from '../IUserRepository';
import ICreateDTO from '../../../dtos/users/ICreateDTO';
import User from './entities/User';

@EntityRepository(User)
class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findAll(): Promise<User[] | undefined> {
    const users = await this.repository.find();
    return users;
  }

  async create(userData: ICreateDTO): Promise<User | undefined> {
    const user = this.repository.create(userData);

    await this.repository.save(user);

    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: {
        username,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);
    return user;
  }

  async update(id: string, userData: ICreateDTO): Promise<User | undefined> {
    const user = await this.repository.save({ id, ...userData });

    return user;
  }

  async deleteById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);
    await this.repository.delete(id);

    return user;
  }
}

export default UserRepository;
