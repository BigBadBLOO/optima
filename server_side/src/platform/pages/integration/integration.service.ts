//core
import { Any, Repository } from 'typeorm';
import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

//entity
import { User } from '../../../user/user.entity';
import { Platform } from '../../entity/platform.entity';
import {
  AppForIntegration,
  AppForIntegrationByPlatformType,
} from '../../entity/appForIntegration.entity';
import { IntegrationUsers } from '../../entity/IntegrtionUsers.entity';
import { CabinetIntegration } from '../../entity/cabinetIntegration.entity';
import { StatusAccountDto } from './dto/statusAccount.dto';
import FactoryService from 'src/platform/entity/platforms/factoryService';

@Injectable()
export class IntegrationService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>,
    @InjectRepository(AppForIntegration)
    private appForIntegrationRepository: Repository<AppForIntegration>,
    @InjectRepository(AppForIntegrationByPlatformType)
    private appForIntegrationByPlatformTypeRepository: Repository<AppForIntegrationByPlatformType>,
    @InjectRepository(IntegrationUsers)
    private integrationUsersRepository: Repository<IntegrationUsers>,
    @InjectRepository(CabinetIntegration)
    private cabinetIntegrationRepository: Repository<CabinetIntegration>,
  ) {}

  async getListIntegrationApp(
    platformName: string,
  ): Promise<AppForIntegration[]> {
    const platform = await this.platformRepository.findOne({
      where: { platformName },
    });

    const apps = await this.appForIntegrationByPlatformTypeRepository.find({
      relations: ['appForIntegration'],
      where: {
        platformsType: platform.type,
      },
    });
    return apps.map((app) => app.appForIntegration);
  }

  async getListIntegrationAccounts(
    user_id: number,
    platformName: string,
  ): Promise<IntegrationUsers[]> {
    const user = await this.userRepository.findOne(user_id, {
      relations: ['platform'],
    });
    let platform;
    if (user.group === 'CLIENT') {
      platform = await this.platformRepository.findOne({
        where: { platformName },
      });
    } else {
      platform = user.platform;
    }

    const relations = ['app', 'user', 'cabinets', 'user.platform'];

    if (user.group === 'CLIENT' || user.group === 'CLIENT_ADMIN') {
      return await this.integrationUsersRepository.find({
        where: {
          platform: platform,
        },
        relations,
      });
    } else if (user.group === 'CLIENT_TEAM_LEAD') {
      const users = await this.userRepository.find({
        where: {
          parent: {
            id: user.id,
          },
        },
      });
      return await this.integrationUsersRepository.find({
        where: {
          user: {
            id: Any([...users.map((el) => el.id), user.id]),
          },
        },
        relations,
      });
    } else if (user.group === 'CLIENT_TRAFFIC_MANAGER') {
      return await this.integrationUsersRepository.find({
        where: {
          user: {
            id: user.id,
          },
        },
        relations,
      });
    }
    return [];
  }

  async statusAccounts(accounts_id: number[]): Promise<StatusAccountDto[]> {
    const response = [];
    for (const account_id of accounts_id) {
      const data: StatusAccountDto = {
        id: account_id,
        status: false,
      };
      const account = await this.integrationUsersRepository.findOne(
        account_id,
        {
          relations: ['app'],
        },
      );
      try {
        const factory = new FactoryService();
        const service = factory.getService(account);
        data.status = await service.statusAccount();
      } catch {}
      response.push(data);
    }
    return response;
  }

  async addIntegrationAccount(
    uid: string,
    name: string,
    token: string,
    app_id: number,
    user_id: number,
    platformName: string,
  ): Promise<IntegrationUsers> {
    const app = await this.appForIntegrationRepository.findOne(app_id);
    const exists_token = await this.integrationUsersRepository.findOne({
      where: { token },
      relations: ['user', 'user.platform'],
    });
    const platform = await this.platformRepository.findOne({
      where: { platformName },
    });
    if (exists_token) {
      if (
        (exists_token.user.platform &&
          exists_token.user.platform.platformName !== platformName) ||
        !exists_token.user.platform
      ) {
        throw new Error(
          'Аккаунт с таким токеном интегрирован в другую платформу',
        );
      }
      throw new Error(
        `Аккаунт с таким токеном интегрирован у пользователя ${exists_token.user.username}`,
      );
    }
    const user_adder = await this.userRepository.findOne(user_id);
    const account = new IntegrationUsers();
    account.uid = uid ? uid : '';
    account.name = name;
    account.token = token;
    account.token_date_update = new Date();
    account.user = user_adder;
    account.app = app;
    account.platform = platform;
    return await this.integrationUsersRepository.save(account);
  }

  async setCabinetForGetStatistic(
    cabinet_id: number,
    factor: number,
    value: boolean,
  ): Promise<CabinetIntegration> {
    await this.cabinetIntegrationRepository.save({
      id: cabinet_id,
      factor,
      access_get_statistic: value,
    });
    return await this.cabinetIntegrationRepository.findOne(cabinet_id);
  }

  async deleteListIntegrationAccounts(accounts_id: number[]): Promise<string> {
    await this.integrationUsersRepository.delete(accounts_id);
    return 'Данные успешно удалены';
  }

  async deleteListIntegrationCabinets(cabinets_id: number[]): Promise<string> {
    await this.cabinetIntegrationRepository.delete(cabinets_id);
    return 'Данные успешно удалены';
  }
}
