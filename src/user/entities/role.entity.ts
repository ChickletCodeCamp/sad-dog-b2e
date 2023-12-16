import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema: 'public', name: 'roles' })
export class RoleEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'roleId' })
    roleId: string;

    @Column({ type: 'varchar', length: 50, name: 'role' })
    role: string;
}
