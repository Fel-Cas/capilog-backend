import { MigrationInterface, QueryRunner } from 'typeorm';

export class FarmsProccessesTables1646802194393 implements MigrationInterface {
    name = 'FarmsProccessesTables1646802194393';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`processes\` (\`idProcess\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`idProcess\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`farms\` (\`idFarm\` int NOT NULL AUTO_INCREMENT, \`farm\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`idFarm\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(
            `CREATE TABLE \`processes_users\` (\`usersDni\` varchar(255) NOT NULL, \`processesIdProcess\` int NOT NULL, INDEX \`IDX_0a9241c15109e033e203328026\` (\`usersDni\`), INDEX \`IDX_34dea2af27dadbc42837388100\` (\`processesIdProcess\`), PRIMARY KEY (\`usersDni\`, \`processesIdProcess\`)) ENGINE=InnoDB`
        );
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`farm\` int NULL`);
        await queryRunner.query(
            `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_57f4a13375d16586df7f00440a3\` FOREIGN KEY (\`farm\`) REFERENCES \`farms\`(\`idFarm\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
        await queryRunner.query(
            `ALTER TABLE \`processes_users\` ADD CONSTRAINT \`FK_0a9241c15109e033e2033280269\` FOREIGN KEY (\`usersDni\`) REFERENCES \`users\`(\`dni\`) ON DELETE CASCADE ON UPDATE CASCADE`
        );
        await queryRunner.query(
            `ALTER TABLE \`processes_users\` ADD CONSTRAINT \`FK_34dea2af27dadbc428373881001\` FOREIGN KEY (\`processesIdProcess\`) REFERENCES \`processes\`(\`idProcess\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`processes_users\` DROP FOREIGN KEY \`FK_34dea2af27dadbc428373881001\``);
        await queryRunner.query(`ALTER TABLE \`processes_users\` DROP FOREIGN KEY \`FK_0a9241c15109e033e2033280269\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_57f4a13375d16586df7f00440a3\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`farm\``);
        await queryRunner.query(`DROP INDEX \`IDX_34dea2af27dadbc42837388100\` ON \`processes_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_0a9241c15109e033e203328026\` ON \`processes_users\``);
        await queryRunner.query(`DROP TABLE \`processes_users\``);
        await queryRunner.query(`DROP TABLE \`farms\``);
        await queryRunner.query(`DROP TABLE \`processes\``);
    }
}
