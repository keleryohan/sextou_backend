import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEvent1617728464754 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
            name: 'events',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'description',
                    type: 'varchar'
                },
                {
                    name: 'voting_limit_date',
                    type: 'timestamp with time zone',
                },
                {
                    name: 'is_public',
                    type: 'boolean'
                },
                {
                    name: 'invitation_code',
                    type: 'varchar'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                  name: "chosen_location_id",
                  type: 'uuid',
                  isNullable: true
                },
                {
                  name: "chosen_schedule_id",
                  type: 'uuid',
                  isNullable: true
                },
                {
                  name: "created_by",
                  type: 'uuid'
                }
            ],
            foreignKeys:[
                {
                    name: "chosen_location_id",
                    referencedTableName: "locations",
                    referencedColumnNames: ["id"],
                    columnNames: ["chosen_location_id"],
                    onDelete: 'CASCADE',
                    onUpdate: "CASCADE"
                },
                {
                    name: "chosen_schedule_id",
                    referencedTableName: "schedules",
                    referencedColumnNames: ["id"],
                    columnNames: ["chosen_schedule_id"],
                    onDelete: 'CASCADE',
                    onUpdate: "CASCADE"
                },
                {
                    name: "created_by",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["created_by"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                },
            ]
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('events');
    }

}
