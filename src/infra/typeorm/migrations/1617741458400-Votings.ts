import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Votings1617741458400 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        new Table({
            name: 'votings',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
            ],
            foreignKeys:[
                {
                    name: "user_id",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["user_id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "event_id",
                    referencedTableName: "events",
                    referencedColumnNames: ["id"],
                    columnNames: ["event_id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "schedule_id",
                    referencedTableName: "schedules",
                    referencedColumnNames: ["id"],
                    columnNames: ["schedule_id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
                {
                    name: "location_id",
                    referencedTableName: "locations",
                    referencedColumnNames: ["id"],
                    columnNames: ["location_id"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
            ]
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('votings');
    }
}
