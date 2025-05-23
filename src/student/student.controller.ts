import {
  All,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student-dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Get()
  @UseGuards(AuthGuard)
  getAll() {
    const AllStudents = this.studentService.getAllStudents();
    return { AllStudents };
  }
  @Get(':id')
  getSingle(@Param('id') id: string) {
    return this.studentService.getStudentById(Number(id));
  }
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.createStudent(createStudentDto);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() body: { name: string; age: number }) {
    const updatedStudent = this.studentService.updateStudent(Number(id), body);
    return { message: 'Student Updated Successfull' };
  }
  @Patch(':id')
  updatePartial(
    @Param('id') id: string,
    @Body() body: Partial<{ name: string; age: number }>,
  ) {
    return this.studentService.patchStudent(Number(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.deleteStudent(Number(id));
  }
}
