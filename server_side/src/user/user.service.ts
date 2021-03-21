import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {User, UserWithToken} from "./user.entity";
import {LoginUserDTO} from "./dto/login.dto";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async login(loginData: LoginUserDTO): Promise<UserWithToken> {
        const user = await this.userRepository.findOne(loginData);
        const payload = { username: user.username}
        const token = {token: this.jwtService.sign(payload)}
        return { ...user, ...token}
    }

    findByUsername(username: string): Promise<User> {
        return this.userRepository.findOne({username});
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(id);
    }
}
