import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductAddonsTable1739318400007 implements MigrationInterface {
  name = 'CreateProductAddonsTable1739318400007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`product_addons\` (
        \`id\` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        \`product_id\` INT NOT NULL,
        \`name\` VARCHAR(255) NOT NULL,
        \`price\` DECIMAL(10,2) NOT NULL DEFAULT 0,
        \`created_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        CONSTRAINT \`FK_product_addons_product\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\` (\`id\`)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`product_addons\``);
  }
}
