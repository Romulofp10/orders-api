import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCategoriesTable1739318400005 implements MigrationInterface {
  name = 'CreateCategoriesTable1739318400005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`categories\` (
        \`id\` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        \`store_id\` INT NOT NULL,
        \`name\` VARCHAR(255) NOT NULL,
        \`description\` VARCHAR(500) NULL,
        \`created_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        CONSTRAINT \`FK_categories_store\` FOREIGN KEY (\`store_id\`) REFERENCES \`stores\` (\`id\`)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`categories\``);
  }
}
