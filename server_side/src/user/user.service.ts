//core
import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";
const bcrypt = require('bcrypt');

//entity
import {User,  UserWithToken} from "./user.entity";
import {Platform} from "../platform/platform.entity";

//dto
import {LoginUserDTO} from "./dto/login.dto";
import {SignUpUserDTO} from "./dto/signUp.dto";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>,
    private jwtService: JwtService
  ) {
  }

  async login(loginData: LoginUserDTO): Promise<UserWithToken | Error> {
    const {password, platformName, email} = loginData
    const platform = platformName ? await this.platformRepository.findOne({where: {platformName}}) : null;

    const user = await this.userRepository.findOne({
      email, platform
    }, {relations: ["platforms", "platform"]});

    const isPasswordMatching = user && await bcrypt.compare(password, user.password);

    if (!user || !isPasswordMatching) throw new Error('Пользователь не существует')
    const payload = {email: user.email, group: user.group, platform: user.platform}
    const token = {token: this.jwtService.sign(payload)}
    return {...user, ...token}
  }

  async signUp(signUpData: SignUpUserDTO): Promise<UserWithToken> {
    const {email} = signUpData
    const user_temp = await this.userRepository.findOne({email, platform: null});

    if (user_temp) throw new Error('Пользователь уже существует')
    
    const password = await bcrypt.hash(signUpData.password, 10);
    const user = await this.userRepository.save({...signUpData, password});
    const payload = {email: user.email, group: user.group, platform: user.platform}
    const token = {token: this.jwtService.sign(payload)}
    return {...user, ...token}
  }

  findUser(user: {email: string, group: string, platform: Platform}): Promise<User> {
    const{ email, platform } = user
    return this.userRepository.findOne({email, platform, status: true}, {relations: ["platforms", "platform"]});
  }

}
