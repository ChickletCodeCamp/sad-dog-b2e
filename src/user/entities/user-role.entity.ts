import { Entity, Column, Unique } from 'typeorm';

@Entity({ schema: 'public', name: 'user_role' })
@Unique('UNIQ_RoleUser', ['roleId', 'userId'])
export class UserRoleEntity {
    @Column('uuid', { name: 'roleId', primary: true, generated: 'uuid' })
    roleId: string;

    @Column('uuid', { name: 'userId', primary: true, generated: 'uuid' })
    userId: string;
}
