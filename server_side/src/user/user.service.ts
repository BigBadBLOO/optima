//core
import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {JwtService} from "@nestjs/jwt";

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
    ) {}

    async login(loginData: LoginUserDTO): Promise<UserWithToken | Error> {
        const user = await this.userRepository.findOne(loginData, {relations: ["platforms"]});
        if(!user) throw new Error('Пользователь не существует')
        const payload = { username: user.username}
        const token = {token: this.jwtService.sign(payload)}
        return { ...user, ...token}
    }

    async signUp(signUpData: SignUpUserDTO): Promise<UserWithToken> {
        const user = await this.userRepository.save(signUpData);
        const payload = { username: user.username}
        const token = {token: this.jwtService.sign(payload)}
        return { ...user, ...token}
    }

    findByUsername(username: string): Promise<User> {
        return this.userRepository.findOne({username}, {relations: ["platforms"]});
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
