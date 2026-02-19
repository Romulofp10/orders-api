import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWaitersTable1739318400002 implements MigrationInterface {
  name = 'CreateWaitersTable1739318400002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE \`waiters\` (
        \`id\` INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
        \`store_id\` INT NOT NULL,
        \`name\` VARCHAR(255) NOT NULL,
        \`email\` VARCHAR(255) NOT NULL,
        \`password\` VARCHAR(255) NOT NULL,
        \`created_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
        \`updated_at\` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
        CONSTRAINT \`UQ_waiters_email\` UNIQUE (\`email\`),
        CONSTRAINT \`FK_waiters_store\` FOREIGN KEY (\`store_id\`) REFERENCES \`stores\` (\`id\`)
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`waiters\``);
  }
}
