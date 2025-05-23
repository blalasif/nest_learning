import { Injectable, NotFoundException } from '@nestjs/common';
import { Student } from './interfaces/student.interface';
import { CreateStudentDto } from './dto/create-student-dto';

@Injectable()
export class StudentService {
  private students = [
    {
      id: 1,
      name: 'Bilal',
      age: 22,
    },
    {
      id: 2,
      name: 'ali',
      age: 25,
    },
  ];
  private student: Student[] = this.students;
  getAllStudents(): Student[] {
    return this.student;
  }
  getStudentById(id: number) {
    const student = this.students.find((s) => s.id === id);
    if (!student) throw new NotFoundException('Student Not Found');
    return student;
  }

  //   post api
  createStudent(createStudentDto: CreateStudentDto) {
    const newStudent: Student = {
      id: Date.now(),
      name: createStudentDto.name,
      // We know age is defined and a number here because of the ValidationPipe
      // and @IsDefined/@IsNumber/@IsInt decorators.
      age: createStudentDto.age, // Type assertion to satisfy the 'Student' interface
    };

    this.students.push(newStudent);
    return newStudent;
  }

  //PUT method
  updateStudent(id: number, data: { name: string; age: number }) {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException('Student Not Found');
    this.students[index] = { id, ...data };
  }
  //PATCH
  patchStudent(id: number, data: Partial<{ name: string; age: number }>) {
    const student = this.getStudentById(id);
    Object.assign(student, data); //object.assgin method is js make of copy of object
    return student;
  }

  //delete
  deleteStudent(id: number) {
    const index = this.students.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException('Student Not Found');
    const deleted = this.students.splice(index, 1);
    return { message: 'Student Deleted', student: deleted[0] };
  }
}
