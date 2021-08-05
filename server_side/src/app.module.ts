//core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

//modules
import { UserModule } from './user/user.module';
import { PlatformModule } from './platform/platform.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    UserModule,
    PlatformModule,
    ApiModule,
  ],
  providers: [],
})
export class AppModule {}
