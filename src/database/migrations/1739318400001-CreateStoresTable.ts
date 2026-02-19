import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStoresTable1739318400001 implements MigrationInterface {
  name = 'CreateStoresTable1739318400001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`stores\` (
        \`id\` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        \`name\` VARCHAR(255) NOT NULL,
        \`address\` VARCHAR(500) NULL,
        \`created_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`stores\``);
  }
}
