import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class RelationsService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(): Promise<User> {
    const user = new this.userModel({
      name: 'Bilal',
      Address: {
        street: '102',
        city: 'Lahore',
      },
    });
    return user.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }
}
