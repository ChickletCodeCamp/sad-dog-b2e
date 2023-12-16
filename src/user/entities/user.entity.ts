import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity({ schema: 'public', name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid', { name: 'userId' })
    userId: string;

    @Column({ type: 'varchar', length: 50, name: 'full_name' })
    fullName: string;

    @Column({ type: 'varchar', length: 100, name: 'email' })
    email: string;

    @Column({ type: 'varchar', length: 128, name: 'password' })
    password: string;

    @Column({ type: 'varchar', length: 20, name: 'phoneNumber' })
    phoneNumber: string;

    @Column({ type: 'varchar', length: 50, name: 'user_name' })
    userName: string;

    @Column({ type: 'varchar', length: 10, name: 'sex' })
    sex: string;

    @Column({ type: 'varchar', length: 10, name: 'age' })
    age: string;

    @Column({ type: 'boolean', name: 'is_email_check' })
    isEmailCheck: boolean;

    @Column({ type: 'boolean', name: 'ban' })
    ban: boolean;

    @CreateDateColumn({ type: 'timestamp without time zone', name: 'create_time' })
    createTime: Date;

    @UpdateDateColumn({ type: 'timestamp without time zone', name: 'update_time' })
    updateTime: Date;

    @Column('uuid', { name: 'update_user_id' })
    updateUserId: string;
}
