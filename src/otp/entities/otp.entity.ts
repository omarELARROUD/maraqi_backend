// import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('OTP', { schema: 'maraqi' })
export class OTP {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', {
    name: 'email',
    nullable: false,
    length: 255,
  })
  email: string;

  @Column('enum', {
    name: 'request_type',
    enum: ['Confirm', 'Reset'],
  })
  requestType: 'Confirm' | 'Reset';

  @Column('int', {
    nullable: false,
  })
  code: number | null;

  @CreateDateColumn()
  createdAt: Date | null;

  @Column('boolean', { default: false })
  verified: boolean;
}