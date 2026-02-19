import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStoreCodeAndSlug1739318400013 implements MigrationInterface {
  name = 'AddStoreCodeAndSlug1739318400013';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`stores\`
        ADD COLUMN \`slug\` VARCHAR(255) NULL UNIQUE AFTER \`name\`,
        ADD COLUMN \`code\` CHAR(4) NULL UNIQUE AFTER \`slug\`,
        ADD COLUMN \`logo\` VARCHAR(500) NULL AFTER \`address\`,
        ADD COLUMN \`cover\` VARCHAR(500) NULL AFTER \`logo\`,
        ADD COLUMN \`status\` TINYINT(1) NOT NULL DEFAULT 1 AFTER \`cover\`,
        ADD COLUMN \`description\` VARCHAR(500) NULL AFTER \`status\`,
        ADD COLUMN \`phone\` VARCHAR(50) NULL AFTER \`description\`,
        ADD COLUMN \`email\` VARCHAR(255) NULL AFTER \`phone\`
    `);
    // Backfill code and slug for existing rows
    await queryRunner.query(`
      UPDATE \`stores\` SET \`code\` = LPAD(FLOOR(1000 + RAND() * 9000), 4, '0'), \`slug\` = CONCAT('store-', \`id\`) WHERE \`code\` IS NULL
    `);
    await queryRunner.query(`
      ALTER TABLE \`stores\`
        MODIFY COLUMN \`code\` CHAR(4) NOT NULL,
        MODIFY COLUMN \`slug\` VARCHAR(255) NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`stores\`
        DROP COLUMN \`email\`,
        DROP COLUMN \`phone\`,
        DROP COLUMN \`description\`,
        DROP COLUMN \`status\`,
        DROP COLUMN \`cover\`,
        DROP COLUMN \`logo\`,
        DROP COLUMN \`code\`,
        DROP COLUMN \`slug\`
    `);
  }
}
