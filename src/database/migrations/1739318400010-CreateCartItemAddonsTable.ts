import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCartItemAddonsTable1739318400010 implements MigrationInterface {
  name = 'CreateCartItemAddonsTable1739318400010';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`cart_item_addons\` (
        \`id\` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        \`cart_item_id\` INT NOT NULL,
        \`product_addon_id\` INT NOT NULL,
        CONSTRAINT \`FK_cart_item_addons_cart_item\` FOREIGN KEY (\`cart_item_id\`) REFERENCES \`cart_items\` (\`id\`) ON DELETE CASCADE,
        CONSTRAINT \`FK_cart_item_addons_product_addon\` FOREIGN KEY (\`product_addon_id\`) REFERENCES \`product_addons\` (\`id\`)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`cart_item_addons\``);
  }
}
