
import { Role } from '../../utils/role';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({unique:true})
  email: string;

  @Column()
  birthDate: string;

  @Column({nullable : true})
  country: string ;

  @Column()
  gender: string;

  @Column()
  phoneNumber: string;

  @Column({nullable : true})
  profession: string|null;

  @Column({nullable : true})
  profilePicture: string|null;

  @Column({unique:true})
  password: string;

  @Column()
  role:Role;

  // @OneToOne(() => Student, student => student.user) // Specify the relationship
  // studentId: Student;
}