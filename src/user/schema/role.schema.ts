export class RoleSchema {

    private static readonly _tableName: string = 'roles';
    public get tableName(): string {
        return RoleSchema._tableName;
    }

    private static readonly _schema: string[] = [
        'roleId',
        'role'
    ];
    public get schema(): string[] {
        return RoleSchema._schema;
    }
}