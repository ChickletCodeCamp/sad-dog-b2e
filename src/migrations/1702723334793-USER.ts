import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class USER1702723334793 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            schema: "public",
            columns: [
                {
                    name: "userId",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()",
                },
                {
                    name: "full_name",
                    type: "varchar",
                    length: "50",
                },
                {
                    name: "email",
                    type: "varchar",
                    length: "100",
                },
                {
                    name: "password",
                    type: "varchar",
                    length: "128",
                },
                {
                    name: "phoneNumber",
                    type: "varchar",
                    length: "20",
                },
                {
                    name: "user_name",
                    type: "varchar",
                    length: "50",
                },
                {
                    name: "sex",
                    type: "varchar",
                    length: "10",
                },
                {
                    name: "age",
                    type: "varchar",
                    length: "10",
                },
                {
                    name: "is_email_check",
                    type: "boolean",
                },
                {
                    name: "ban",
                    type: "boolean",
                },
                {
                    name: "create_time",
                    type: "timestamp without time zone",
                },
                {
                    name: "update_time",
                    type: "timestamp without time zone",
                },
                {
                    name: "update_user_id",
                    type: "uuid",
                },
            ]
        }));

        await queryRunner.createTable(new Table({
            name: "roles",
            schema: "public",
            columns: [
                {
                    name: "roleId",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()",
                },
                {
                    name: "role",
                    type: "varchar",
                    length: "50",
                }
            ]
        }));

        await queryRunner.manager.insert('roles', [
            { role: 'Admin' },
            { role: 'Manager' },
            { role: 'User' }
        ]);

        await queryRunner.createTable(new Table({
            name: "user_role",
            schema: "public",
            columns: [
                {
                    name: "roleId",
                    type: "uuid",
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()",
                },
                {
                    name: "userId",
                    type: "uuid",
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()",
                },
            ],
            uniques: [
                {
                    name: "UNIQ_RoleUser",
                    columnNames: ["roleId", "userId"],
                },
            ],
        }));

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users", true, true, true);
        await queryRunner.dropTable("roles", true, true, true);
        await queryRunner.dropTable("user_role", true, true, true);
    }

}
