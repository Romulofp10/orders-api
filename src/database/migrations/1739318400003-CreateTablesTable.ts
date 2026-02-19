import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablesTable1739318400003 implements MigrationInterface {
  name = 'CreateTablesTable1739318400003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`tables\` (
        \`id\` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        \`store_id\` INT NOT NULL,
        \`number\` INT NOT NULL,
        \`created_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        CONSTRAINT \`FK_tables_store\` FOREIGN KEY (\`store_id\`) REFERENCES \`stores\` (\`id\`)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`tables\``);
  }
}
