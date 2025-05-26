import { Module } from '@nestjs/common';
import { Student, StudentSchema } from './student.schema';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  providers: [StudentService],
  controllers: [StudentController],
})
export class StudentModule {}
