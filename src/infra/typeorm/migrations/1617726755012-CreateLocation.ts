import {MigrationInterface, QueryRunner, Table} from "typeorm";


export class CreateLocation1617726755012 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        new Table({
            name: 'locations',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'description',
                    type: 'varchar',
                },
                {
                    name: 'location',
                    type: 'geography',
                    spatialFeatureType: 'Point',
                    srid: 4326,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
            foreignKeys:[
                {
                    name: "eventID",
                    referencedTableName: "events",
                    referencedColumnNames: ["id"],
                    columnNames: ["eventID"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('locations');
    }

}
