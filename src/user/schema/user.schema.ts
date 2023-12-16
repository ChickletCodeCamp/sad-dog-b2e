export class UserSchema {

    private static readonly _tableName: string = 'users';
    public get tableName(): string {
        return UserSchema._tableName;
    }

    private static readonly _schema: string[] = [
        'userId',
        'fullName',
        'email',
        'password',
        'phoneNumber',
        'userName',
        'sex',
        'age',
        'isEmailCheck',
        'ban',
        'createTime',
        'updateTime',
        'updateUserId'
    ];
    public get schema(): string[] {
        return UserSchema._schema;
    }
}