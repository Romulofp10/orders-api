import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameComandasToCommandsAndAddType1739318400011
  implements MigrationInterface
{
  name = 'RenameComandasToCommandsAndAddType1739318400011';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`RENAME TABLE \`comandas\` TO \`commands\``);
    await queryRunner.query(`
      ALTER TABLE \`commands\`
      ADD COLUMN \`type\` VARCHAR(20) NOT NULL DEFAULT 'table'
    `);
    await queryRunner.query(
      `ALTER TABLE \`carts\` DROP FOREIGN KEY \`FK_carts_comanda\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`carts\` CHANGE \`comanda_id\` \`command_id\` INT NOT NULL`,
    );
    await queryRunner.query(`
      ALTER TABLE \`carts\`
      ADD CONSTRAINT \`FK_carts_command\` FOREIGN KEY (\`command_id\`) REFERENCES \`commands\` (\`id\`)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`carts\` DROP FOREIGN KEY \`FK_carts_command\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`carts\` CHANGE \`command_id\` \`comanda_id\` INT NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`commands\` DROP COLUMN \`type\``,
    );
    await queryRunner.query(`RENAME TABLE \`commands\` TO \`comandas\``);
    await queryRunner.query(`
      ALTER TABLE \`carts\`
      ADD CONSTRAINT \`FK_carts_comanda\` FOREIGN KEY (\`comanda_id\`) REFERENCES \`comandas\` (\`id\`)
    `);
  }
}
