import { Type } from 'class-transformer';
import {
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  name: string;
  @IsDefined({ message: 'Age is required' })
  @Type(() => Number)
  @IsNumber({}, { message: 'Age must be a number' })
  @IsInt({ message: 'Age must be an integer' })
  @Min(1, { message: 'Age must be at least 1' })
  age: number;
}
