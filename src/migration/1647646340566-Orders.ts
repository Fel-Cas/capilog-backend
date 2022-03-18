import {MigrationInterface, QueryRunner} from "typeorm";

export class Orders1647646340566 implements MigrationInterface {
    name = 'Orders1647646340566'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`processes\` (\`idProcess\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`idProcess\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role\` varchar(200) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`dni\` varchar(255) NOT NULL, \`name\` varchar(150) NOT NULL, \`lastname\` varchar(150) NOT NULL, \`password\` varchar(250) NOT NULL, \`phone\` varchar(20) NOT NULL, \`email\` varchar(250) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`role\` int NULL, \`farm\` int NULL, PRIMARY KEY (\`dni\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`farms\` (\`idFarm\` int NOT NULL AUTO_INCREMENT, \`farm\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`idFarm\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`trucks\` (\`license\` varchar(255) NOT NULL, \`driverName\` varchar(255) NOT NULL, \`dniDriver\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`license\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`type-orders\` (\`idTypeOrder\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`idTypeOrder\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order\` (\`idOrder\` int NOT NULL AUTO_INCREMENT, \`startDate\` timestamp NOT NULL, \`description\` varchar(255) NOT NULL, \`arriveDate\` timestamp NULL, \`exitDate\` timestamp NULL, \`destinationArriveDate\` timestamp NULL, \`finishDate\` timestamp NULL, \`isBill\` tinyint NULL DEFAULT 0, \`first_farm\` int NULL, \`last_farm\` int NULL, \`order_statement\` int NULL, \`user\` varchar(255) NULL, \`truck\` varchar(255) NULL, \`typeOrderIdTypeOrder\` int NULL, PRIMARY KEY (\`idOrder\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`order-statements\` (\`idOrderStatement\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`idOrderStatement\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`routes\` (\`idroutes\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(200) NOT NULL, \`observations\` varchar(200) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`idroutes\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`routeOrders\` (\`idrouteOrder\` int NOT NULL AUTO_INCREMENT, \`startDate\` timestamp NULL, \`finishDate\` timestamp NULL, \`state\` varchar(45) NOT NULL, \`isBill\` tinyint NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`routeIdroutes\` int NULL, \`truckLicense\` varchar(255) NULL, UNIQUE INDEX \`REL_f176effe3b2aae5a4b3a04ee77\` (\`routeIdroutes\`), UNIQUE INDEX \`REL_c3fda306aa7c5cb4e17ba0db9e\` (\`truckLicense\`), PRIMARY KEY (\`idrouteOrder\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`processes_users\` (\`usersDni\` varchar(255) NOT NULL, \`processesIdProcess\` int NOT NULL, INDEX \`IDX_0a9241c15109e033e203328026\` (\`usersDni\`), INDEX \`IDX_34dea2af27dadbc42837388100\` (\`processesIdProcess\`), PRIMARY KEY (\`usersDni\`, \`processesIdProcess\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_ace513fa30d485cfd25c11a9e4a\` FOREIGN KEY (\`role\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_57f4a13375d16586df7f00440a3\` FOREIGN KEY (\`farm\`) REFERENCES \`farms\`(\`idFarm\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_0f1dd2c5c34a6c450eec5241b7f\` FOREIGN KEY (\`first_farm\`) REFERENCES \`farms\`(\`idFarm\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_5c42ba242714cd1b7b0b0b9a83a\` FOREIGN KEY (\`last_farm\`) REFERENCES \`farms\`(\`idFarm\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_a8aa40aa022ccb3ad990287af79\` FOREIGN KEY (\`order_statement\`) REFERENCES \`order-statements\`(\`idOrderStatement\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_6807ee8d7ff4c3349f781c2b28e\` FOREIGN KEY (\`user\`) REFERENCES \`users\`(\`dni\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_ee2f67c216c9db9ef127dd09e17\` FOREIGN KEY (\`truck\`) REFERENCES \`trucks\`(\`license\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`order\` ADD CONSTRAINT \`FK_e1c8785cce941b856afac71696e\` FOREIGN KEY (\`typeOrderIdTypeOrder\`) REFERENCES \`type-orders\`(\`idTypeOrder\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`routeOrders\` ADD CONSTRAINT \`FK_f176effe3b2aae5a4b3a04ee77e\` FOREIGN KEY (\`routeIdroutes\`) REFERENCES \`routes\`(\`idroutes\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`routeOrders\` ADD CONSTRAINT \`FK_c3fda306aa7c5cb4e17ba0db9eb\` FOREIGN KEY (\`truckLicense\`) REFERENCES \`trucks\`(\`license\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`processes_users\` ADD CONSTRAINT \`FK_0a9241c15109e033e2033280269\` FOREIGN KEY (\`usersDni\`) REFERENCES \`users\`(\`dni\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`processes_users\` ADD CONSTRAINT \`FK_34dea2af27dadbc428373881001\` FOREIGN KEY (\`processesIdProcess\`) REFERENCES \`processes\`(\`idProcess\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`processes_users\` DROP FOREIGN KEY \`FK_34dea2af27dadbc428373881001\``);
        await queryRunner.query(`ALTER TABLE \`processes_users\` DROP FOREIGN KEY \`FK_0a9241c15109e033e2033280269\``);
        await queryRunner.query(`ALTER TABLE \`routeOrders\` DROP FOREIGN KEY \`FK_c3fda306aa7c5cb4e17ba0db9eb\``);
        await queryRunner.query(`ALTER TABLE \`routeOrders\` DROP FOREIGN KEY \`FK_f176effe3b2aae5a4b3a04ee77e\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_e1c8785cce941b856afac71696e\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_ee2f67c216c9db9ef127dd09e17\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_6807ee8d7ff4c3349f781c2b28e\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_a8aa40aa022ccb3ad990287af79\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_5c42ba242714cd1b7b0b0b9a83a\``);
        await queryRunner.query(`ALTER TABLE \`order\` DROP FOREIGN KEY \`FK_0f1dd2c5c34a6c450eec5241b7f\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_57f4a13375d16586df7f00440a3\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_ace513fa30d485cfd25c11a9e4a\``);
        await queryRunner.query(`DROP INDEX \`IDX_34dea2af27dadbc42837388100\` ON \`processes_users\``);
        await queryRunner.query(`DROP INDEX \`IDX_0a9241c15109e033e203328026\` ON \`processes_users\``);
        await queryRunner.query(`DROP TABLE \`processes_users\``);
        await queryRunner.query(`DROP INDEX \`REL_c3fda306aa7c5cb4e17ba0db9e\` ON \`routeOrders\``);
        await queryRunner.query(`DROP INDEX \`REL_f176effe3b2aae5a4b3a04ee77\` ON \`routeOrders\``);
        await queryRunner.query(`DROP TABLE \`routeOrders\``);
        await queryRunner.query(`DROP TABLE \`routes\``);
        await queryRunner.query(`DROP TABLE \`order-statements\``);
        await queryRunner.query(`DROP TABLE \`order\``);
        await queryRunner.query(`DROP TABLE \`type-orders\``);
        await queryRunner.query(`DROP TABLE \`trucks\``);
        await queryRunner.query(`DROP TABLE \`farms\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`processes\``);
    }

}
