import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1617052772287 implements MigrationInterface {
    name = 'PostRefactoring1617052772287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "platform" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "platform" ADD CONSTRAINT "FK_0b8e44f4158b0cfe83914f71563" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "platform" DROP CONSTRAINT "FK_0b8e44f4158b0cfe83914f71563"`);
        await queryRunner.query(`ALTER TABLE "platform" DROP COLUMN "userId"`);
    }

}
