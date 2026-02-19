import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateComandasTable1739318400004 implements MigrationInterface {
  name = 'CreateComandasTable1739318400004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`comandas\` (
        \`id\` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        \`table_id\` INT NOT NULL,
        \`created_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        CONSTRAINT \`FK_comandas_table\` FOREIGN KEY (\`table_id\`) REFERENCES \`tables\` (\`id\`)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`comandas\``);
  }
}
