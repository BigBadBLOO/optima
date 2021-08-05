//core
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import bcrypt = require('bcrypt');
import fetch from 'node-fetch';
//entity
import { User, UserWithToken } from './user.entity';
import { Platform } from '../platform/entity/platform.entity';

//dto
import { LoginUserDTO } from './dto/login.dto';
import { SignUpUserDTO } from './dto/signUp.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>,
    private jwtService: JwtService,
  ) {}

  async login(loginData: LoginUserDTO): Promise<UserWithToken | Error> {
    const { password, platformName, email } = loginData;
    let platform = await this.platformRepository.findOne({
      where: { platformName },
    });
    platform = platform ? platform : null;

    const user = await this.userRepository.findOne(
      { email, platform: platform ? platform : null, status: true },
      { relations: ['platforms', 'platform'] },
    );

    const isPasswordMatching =
      user && (await bcrypt.compare(password, user.password));

    if (!isPasswordMatching) throw new Error('Пользователь не существует');
    const payload = {
      id: user.id,
    };
    const token = { token: this.jwtService.sign(payload) };
    return { ...user, ...token };
  }

  async signUp(signUpData: SignUpUserDTO): Promise<UserWithToken> {
    const { email } = signUpData;
    const user_temp = await this.userRepository.findOne({
      email,
      platform: null,
    });

    if (user_temp) throw new Error('Пользователь уже существует');

    const password = await bcrypt.hash(signUpData.password, 10);
    const user = await this.userRepository.save({ ...signUpData, password });
    const payload = {
      id: user.id,
    };
    const token = { token: this.jwtService.sign(payload) };
    return { ...user, ...token };
  }

  async findUser(user_id: number): Promise<User> {
    return await this.userRepository.findOne(
      { id: user_id, status: true },
      { relations: ['platforms', 'platform'] },
    );
  }

  async findUserAndPlatform(
    user_id: number,
    platformName: string,
  ): Promise<[User, Platform]> {
    const user = await this.userRepository.findOne(user_id, {
      relations: ['platform', 'children'],
    });
    fetch(
      'https://xn--c1abejoq.xn--p1acf/api/v1/leads/?username=butokvs&api_key%20=42f7dmtqcbazt50vj1qj',
      {
        method: 'POST',
        body: JSON.stringify({
          api_key: 'adm6gme00inqa72f0jg0',
          username: 'butokvs',
          id: 24645,
          comment_advertiser: 'werwer',
          extraStatus: 'Дубль',
        }),
      },
    )
      .then((e) => console.log(e.json()))
      .catch((e) => console.log(e));
    let platform: Platform;
    if (user.group === 'CLIENT') {
      platform = await this.platformRepository.findOne({
        where: { platformName },
      });
    } else {
      platform = user.platform;
    }
    return [user, platform];
  }
}
