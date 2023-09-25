import { User } from '../../user/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '1' })
    khatmaNumber: number;

    @Column({ default: '0' })
    score: number;

    @OneToOne(() => User, { cascade: true
        // ,
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user:User;
}
