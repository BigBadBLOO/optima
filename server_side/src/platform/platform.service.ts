//core
import {FindManyOptions, Repository} from "typeorm";
import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";

//entity
import {User, UserGroup} from "../user/user.entity";
import {Pagination, Platform, UsersAndCount} from "./platform.entity";
import {AddWorkerDTO} from "./controlWorker/dto/addWorker.dto";
import {UpdateWorkerDTO} from "./controlWorker/dto/updateWorker.dto";
import {DeleteWorkerDTO} from "./controlWorker/dto/deleteWorker.dto";


const bcrypt = require('bcrypt');


@Injectable()
export class PlatformService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Platform)
        private platformRepository: Repository<Platform>,
    ) {
    }

    async getListWorker(user: User, platformName: string, pagination: Pagination): Promise<UsersAndCount> {
        const platform = await this.platformRepository.findOne({where: {platformName}});

        const default_order = {}

        pagination.sortBy.forEach((el: {id, desc: boolean}) => {
            default_order[el.id] = el.desc ? 'DESC' : 'ASC'
        })

        const pagination_common: FindManyOptions<User> = {
            order: default_order,
            skip: pagination.pageIndex * pagination.pageSize,
            take: pagination.pageSize
        }

        if (user.group === 'CLIENT' || user.group === 'CLIENT_ADMIN') {
            const [users, count] = await this.userRepository.findAndCount({
                where: {
                    platform,
                    parent: null
                },
                relations: ["parent", "children", "children.offers" ,"offers"],
                ...pagination_common
            });

            return {users, count}
        }
    }

    async addWorker(addWorkerData: AddWorkerDTO): Promise<string> {
        const {platform, group, ...data} = addWorkerData
        const user_platform = await this.platformRepository.findOne({where: {platformName: platform}});
        const user_temp = await this.userRepository.findOne({
            where: {
                email: addWorkerData.email,
                platform: user_platform
            }
        });
        if (user_temp) throw new Error('Пользователь уже существует')

        const password = await bcrypt.hash(addWorkerData.password, 10);
        console.log(addWorkerData)

        await this.userRepository.save({
            ...data,
            password,
            group: UserGroup[group],
            platform: user_platform
        });
        return "Данные успешно добавлены"
    }

    async updateWorker(updateWorkerData: UpdateWorkerDTO): Promise<string> {
        const {platform, group, password, ...data} = updateWorkerData
        const user_platform = await this.platformRepository.findOne({where: {platformName: platform}});
        const user = await this.userRepository.findOne({
            where: {
                id: updateWorkerData.id,
                platform: user_platform
            }
        });
        if (!user) throw new Error('Пользователь не найден')

        let passwordNew = user.password
        if(password){
            passwordNew = await bcrypt.hash(password, 10);
        }

        console.log(data)
        await this.userRepository.save({
            ...user,
            ...data,
            passwordNew,
            group: UserGroup[group],
        })
        return "Данные успешно изменены"
    }

    async deleteWorker(deleteWorkerData: DeleteWorkerDTO, user: User): Promise<string> {
        await this.userRepository.delete(deleteWorkerData.id);
        return 'Данные успешно удалены'
    }
}
