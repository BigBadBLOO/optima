//core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './user.entity';
import { Platform } from '../platform/entity/platform.entity';

//config
import { jwtConstants } from '../../config/user.config';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Platform]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
  ],
  providers: [UserService, UserResolver, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
