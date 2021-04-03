//core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

//modules
import { UserModule } from './user/user.module';
import { PlatformModule } from './platform/platform.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    UserModule,
    PlatformModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
