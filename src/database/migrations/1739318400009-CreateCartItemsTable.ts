import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCartItemsTable1739318400009 implements MigrationInterface {
  name = 'CreateCartItemsTable1739318400009';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`cart_items\` (
        \`id\` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        \`cart_id\` INT NOT NULL,
        \`product_id\` INT NOT NULL,
        \`quantity\` INT NOT NULL DEFAULT 1,
        \`created_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        CONSTRAINT \`FK_cart_items_cart\` FOREIGN KEY (\`cart_id\`) REFERENCES \`carts\` (\`id\`) ON DELETE CASCADE,
        CONSTRAINT \`FK_cart_items_product\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\` (\`id\`)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`cart_items\``);
  }
}
