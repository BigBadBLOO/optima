import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";

import {UserService} from "./user.service";
import {User} from "./user.entity";
import {UserResolver} from "./user.resolver";
import {jwtConstants} from "../../config/user.config";
import {JwtStrategy} from "./auth/jwt.strategy";


@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '1d'},
        }),
        PassportModule,
    ],
    providers: [UserService, UserResolver, JwtStrategy],
    exports: [UserResolver],
})
export class UserModule {}
