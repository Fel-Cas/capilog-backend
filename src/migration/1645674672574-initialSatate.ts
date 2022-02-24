/* eslint-disable prettier/prettier */
import { Role } from "src/users/entities";
import {MigrationInterface, QueryRunner} from "typeorm";

export class initialSatate1645674672574 implements MigrationInterface {
    name = 'initialSatate1645674672574';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`dni\` varchar(255) NOT NULL, \`name\` varchar(150) NOT NULL, \`lastname\` varchar(150) NOT NULL, \`password\` varchar(250) NOT NULL, \`phone\` varchar(20) NOT NULL, \`email\` varchar(250) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`role\` int NULL, PRIMARY KEY (\`dni\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role\` varchar(200) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_ace513fa30d485cfd25c11a9e4a\` FOREIGN KEY (\`role\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_ace513fa30d485cfd25c11a9e4a\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
    }

}
