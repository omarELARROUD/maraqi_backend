import { ConflictException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { encryptData } from '../utils/password.encrypt';

@Injectable()
export class StudentService {

  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}
  
  // create(createStudentDto: CreateStudentDto) {
  //   const student = new Student();
  //   student.khatmaNumber = createStudentDto.khatmaNumber;
  //   student.score = createStudentDto.score;

  //   return this.studentRepository.save(student);
  // }


  async create(studentData: CreateStudentDto): Promise<Student> {
    const pass = studentData.user.password
    studentData.user.password=encryptData(pass);
    try {
     const student = await this.studentRepository.save(studentData);
     return student
    } catch (error) {
      console.log(error);
      throw new ConflictException('Email is already taken.');
    }
    }

  findAll() {

    return this.studentRepository.find({relations : ['user']});
  }

  async findOne(id: number) {
      const student= await this.studentRepository.findOne(
        {
          where: { id },
        relations : ['user'], 
       });
      if (!student) {
        throw new NotFoundException('Student not found');
      }
      return student;
  }



  async update(id: number, updateData: UpdateStudentDto): Promise<Student> {
    const student = await this.studentRepository.findOne(
      {
      where: { id },
      relations : ['user'], 
      });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    Object.assign(student.user, updateData);
    Object.assign(student, updateData);
    this.userRepository.save(student.user);
    return this.studentRepository.save(student);
  }

  async remove(id: number) {
    const student = await this.studentRepository.findOne({where: { id }, relations: ['user'] });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    await this.studentRepository.remove(student);
    await this.userRepository.remove(student.user)
  }

  async removeAll(){
    return await this.studentRepository.clear();
}
}
