export class UserRoleSchema {

    private static readonly _tableName: string = 'user_role';
    public get tableName(): string {
        return UserRoleSchema._tableName;
    }

    private static readonly _schema: string[] = [
        'roleId',
        'userId'
    ];
    public get schema(): string[] {
        return UserRoleSchema._schema;
    }
}