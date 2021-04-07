import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class AddEventIdInLocationAndSchedule1617754393624 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createForeignKey(
        'locations',
        new TableForeignKey({
          name: "event_id",
          referencedTableName: "events",
          referencedColumnNames: ["id"],
          columnNames: ["event_id"],
          onDelete: "CASCADE",
          onUpdate: "CASCADE"
        })
      );

      await queryRunner.createForeignKey(
        'schedules',
        new TableForeignKey({
          name: "event_id",
          referencedTableName: "events",
          referencedColumnNames: ["id"],
          columnNames: ["event_id"],
          onDelete: "CASCADE",
          onUpdate: "CASCADE"
        })
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('locations', 'event_id');
      await queryRunner.dropForeignKey('schedules', 'event_id');
    }

}
