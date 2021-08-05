//core
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

//entity
import { Platform } from './entity/platform.entity';
import { TableTemplate } from './entity/tableTemplate.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class PlatformService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>,
    @InjectRepository(TableTemplate)
    private tableTemplateRepository: Repository<TableTemplate>,
  ) {}

  async findPlatformByName(platformName: string): Promise<Platform> {
    const platform = await this.platformRepository.findOne({
      where: { platformName },
    });
    return platform ? platform : null;
  }

  async getAllTableTemplates(
    user_id: number,
    platformName: string,
  ): Promise<TableTemplate[]> {
    const [user] = await this.userService.findUserAndPlatform(
      user_id,
      platformName,
    );
    return this.tableTemplateRepository.find({
      where: {
        user,
      },
    });
  }
  async getTableTemplate(
    user_id: number,
    platformName,
    table_name: string,
  ): Promise<TableTemplate> {
    const [user] = await this.userService.findUserAndPlatform(
      user_id,
      platformName,
    );
    return await this.tableTemplateRepository.findOne({
      where: {
        user,
        table: table_name,
      },
      relations: ['tableCols'],
    });
  }
}
