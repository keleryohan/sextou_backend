import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddImgFieldToEventsTable1619498390775 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'events',
            new TableColumn({
                name: 'img',
                type: 'varchar',
                isNullable: true
            })
        );

        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('events', 'img');
        await queryRunner.dropColumn('users', 'avatar');
    }
}
