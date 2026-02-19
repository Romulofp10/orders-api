import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductsTable1739318400006 implements MigrationInterface {
  name = 'CreateProductsTable1739318400006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`products\` (
        \`id\` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        \`category_id\` INT NOT NULL,
        \`name\` VARCHAR(255) NOT NULL,
        \`price\` DECIMAL(10,2) NOT NULL DEFAULT 0,
        \`description\` VARCHAR(500) NULL,
        \`created_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        CONSTRAINT \`FK_products_category\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\` (\`id\`)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`products\``);
  }
}
