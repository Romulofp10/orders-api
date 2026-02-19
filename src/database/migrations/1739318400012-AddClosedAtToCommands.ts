import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddClosedAtToCommands1739318400012 implements MigrationInterface {
  name = 'AddClosedAtToCommands1739318400012';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE \`commands\`
      ADD COLUMN \`closed_at\` DATETIME(6) NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`commands\` DROP COLUMN \`closed_at\``,
    );
  }
}
