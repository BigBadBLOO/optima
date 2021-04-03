import {MigrationInterface, QueryRunner} from "typeorm";

export class PostRefactoring1617052152508 implements MigrationInterface {
    name = 'PostRefactoring1617052152508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "platform_type_enum" AS ENUM('AgencyLidgen')`);
        await queryRunner.query(`CREATE TABLE "platform" ("id" SERIAL NOT NULL, "platformName" character varying NOT NULL DEFAULT '', "type" "platform_type_enum" NOT NULL DEFAULT 'AgencyLidgen', CONSTRAINT "PK_c33d6abeebd214bd2850bfd6b8e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."email" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."email" IS NULL`);
        await queryRunner.query(`DROP TABLE "platform"`);
        await queryRunner.query(`DROP TYPE "platform_type_enum"`);
    }

}
