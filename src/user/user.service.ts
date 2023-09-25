import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { decryptData, encryptData } from '../utils/password.encrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    const user =  await this.userRepository.findOne({ where: { email } });
    console.log(user)
    if (!user) {
      throw new NotFoundException('Student not found');
    }
    return user;
  }

  // create(createUserDto: CreateUserDto) {
  //   const user = new User();

  //   user.firstName = createUserDto.firstName;
  //   user.lastName = createUserDto.lastName;
  //   user.email = createUserDto.email;
  //   user.birthDate = createUserDto.birthDate;
  //   user.country = createUserDto.country;
  //   user.gender = createUserDto.gender;
  //   user.phoneNumber = createUserDto.phoneNumber;
  //   user.profession = createUserDto.profession;
  //   user.profilePicture = createUserDto.profilePicture;
  //   user.password = createUserDto.password; 

  //   return this.userRepository.save(user);

  // }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user= await this.userRepository.findOne({where: { id } });
    if (!user) {
      throw new NotFoundException('Student not found');
    }
    decryptData(user.password)
    return user;  }

  // async update(id: number, updateUserDto: UpdateUserDto) {
  //    }

  async updateUser(email: string, updateData: Partial<User>): Promise<User> {
    const user = await this.userRepository.findOne({where: { email} });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    updateData.password=encryptData(updateData.password);
    Object.assign(user, updateData);
    return this.userRepository.save(user);
  }
  remove(id: number) {
    return this.userRepository.delete(id);
  }

  removeAll(){
    return this.userRepository.clear();
  }
}