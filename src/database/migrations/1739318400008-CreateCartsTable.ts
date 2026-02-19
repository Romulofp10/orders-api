import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCartsTable1739318400008 implements MigrationInterface {
  name = 'CreateCartsTable1739318400008';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`carts\` (
        \`id\` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        \`comanda_id\` INT NOT NULL,
        \`payment_method\` VARCHAR(20) NOT NULL,
        \`created_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        CONSTRAINT \`FK_carts_comanda\` FOREIGN KEY (\`comanda_id\`) REFERENCES \`comandas\` (\`id\`)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`carts\``);
  }
}
