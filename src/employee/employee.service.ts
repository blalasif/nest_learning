import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './schemas/employee.schema';
import { Model } from 'mongoose';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    @InjectModel(Profile.name) private profileModle: Model<Profile>,
  ) {}
  async createEmployee(): Promise<Employee> {
    const profile = await new this.profileModle({
      age: 24,
      qualification: 'Matric',
    }).save();
    const employee = new this.employeeModel({
      name: 'Ali Raza',
      profile: profile._id,
    });
    return employee.save();
  }

  async getAll(): Promise<Employee[]> {
    return this.employeeModel.find().populate('profile').exec();
  }
}
