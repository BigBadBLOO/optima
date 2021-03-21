//core
import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {UserModule} from './user/user.module';
import {GraphQLModule} from "@nestjs/graphql";


@Module({
    imports: [
        TypeOrmModule.forRoot(),
        GraphQLModule.forRoot({
            autoSchemaFile: 'schema.gql'
        }),
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
