import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Any, FindManyOptions, IsNull, Not, Repository} from 'typeorm';
import { User } from '../../../../user/user.entity';
import { Pagination, Platform } from '../../../entity/platform.entity';
import {Flow, FlowDomain, FlowsAndCount, LandingsByFlow} from '../../../entity/flow.entity';
import { AddFlowDto } from './dto/addFlow.dto';
import { UpdateFlowDto } from './dto/updateFlow.dto';
import { DeleteFlowDto } from './dto/deleteFlow.dto';
import { UserService } from '../../../../user/user.service';

@Injectable()
export class FlowService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>,
    @InjectRepository(Flow)
    private flowRepository: Repository<Flow>,
    @InjectRepository(FlowDomain)
    private flowDomainRepository: Repository<FlowDomain>,
    @InjectRepository(LandingsByFlow)
    private landingsByFlowRepository: Repository<LandingsByFlow>,
  ) {}

  async getListFLows(
    user_id: number,
    platformName: string,
    pagination: Pagination,
  ): Promise<FlowsAndCount> {
    const [user, platform] = await this.userService.findUserAndPlatform(
      user_id,
      platformName,
    );

    const default_order = {};

    pagination.sortBy.forEach((el: { id; desc: boolean }) => {
      default_order[el.id] = el.desc ? 'DESC' : 'ASC';
    });

    const pagination_common: FindManyOptions<Flow> = {
      order: default_order,
      skip: pagination.pageIndex * pagination.pageSize,
      take: pagination.pageSize,
    };
    const relations = [
      'domain',
      'account',
      'app',
      'landingsByFlow',
      'landingsByFlow.landing',
      'landingsByFlow.landing.offer',
    ];
    if (
      user.group === 'CLIENT' ||
      user.group === 'CLIENT_ADMIN' ||
      user.group === 'CLIENT_TEAM_LEAD'
    ) {
      const [flows, count] = await this.flowRepository.findAndCount({
        where: {
          platform,
        },
        relations,
        ...pagination_common,
      });
      return { flows, count };
    } else if (user.group === 'CLIENT_TRAFFIC_MANAGER') {
      const [flows, count] = await this.flowRepository.findAndCount({
        where: {
          platform,
          account: user,
        },
        relations,
        ...pagination_common,
      });
      return { flows, count };
    }
  }

  async getListFLowDomains(platformName: string): Promise<FlowDomain[]> {
    const platform = { id: 1 };
    return await this.flowDomainRepository.find({
      where: { platform },
    });
  }

  async addFLow(addFlowData: AddFlowDto, account_id: number): Promise<Flow> {
    const [user, platform] = await this.userService.findUserAndPlatform(
      account_id,
      addFlowData.platform.platformName,
    );
    addFlowData.account = user;
    addFlowData.platform = platform;
    return await this.flowRepository.save(addFlowData);
  }

  async updateFlow(updateFlowData: UpdateFlowDto): Promise<Flow> {
    const flow = await this.flowRepository.save(updateFlowData);
    await this.landingsByFlowRepository.delete({
      flow: IsNull(),
    });
    return flow;
  }

  async deleteFLow(deleteFlowData: DeleteFlowDto): Promise<string> {
    await this.flowRepository.delete(deleteFlowData.id);
    return 'Данные успешно удалены';
  }
}
