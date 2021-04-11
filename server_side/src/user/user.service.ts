//core
import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";

const bcrypt = require('bcrypt');

//entity
import {User, UserWithToken} from "./user.entity";
import {LoginUserDTO} from "./dto/login.dto";
import {SignUpUserDTO} from "./dto/signUp.dto";


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {
  }

  async login(loginData: LoginUserDTO): Promise<UserWithToken | Error> {
    const {password, ...data} = loginData

    const user = await this.userRepository.findOne({
      ...data,
      platform: null
    }, {relations: ["platforms", "platform"]});

    const isPasswordMatching = user && await bcrypt.compare(password, user.password);

    if (!user || !isPasswordMatching) throw new Error('Пользователь не существует')
    const payload = {email: user.email}
    const token = {token: this.jwtService.sign(payload)}
    return {...user, ...token}
  }

  async signUp(signUpData: SignUpUserDTO): Promise<UserWithToken> {
    const {email} = signUpData
    const user_temp = await this.userRepository.findOne({email, platform: null});

    if (user_temp) throw new Error('Пользователь уже существует')
    
    const password = await bcrypt.hash(signUpData.password, 10);
    const user = await this.userRepository.save({...signUpData, password});
    const payload = {email: user.email}
    const token = {token: this.jwtService.sign(payload)}
    return {...user, ...token}
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({email}, {relations: ["platforms", "platform"]});
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
