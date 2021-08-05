import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer, OffersAndCount } from '../../entity/offers.entity';
import {
  Any,
  Between,
  FindManyOptions,
  IsNull,
  Not,
  Repository,
} from 'typeorm';
import { User } from '../../../user/user.entity';
import { DateRange, Pagination, Platform } from '../../entity/platform.entity';
import { IntegrationUsers } from '../../entity/IntegrtionUsers.entity';
import { UserService } from '../../../user/user.service';
import { Lead, LeadsAndCount } from '../../entity/lead.entity';

@Injectable()
export class LeadsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>,
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
  ) {}

  async getListLeads(
    user_id: number,
    platformName: string,
    pagination: Pagination,
    dateRange: DateRange,
  ): Promise<LeadsAndCount> {
    const [user, platform] = await this.userService.findUserAndPlatform(
      user_id,
      platformName,
    );

    const default_order = {};

    pagination.sortBy.forEach((el: { id; desc: boolean }) => {
      default_order[el.id] = el.desc ? 'DESC' : 'ASC';
    });

    const pagination_common: FindManyOptions<Lead> = {
      order: default_order,
      skip: pagination.pageIndex * pagination.pageSize,
      take: pagination.pageSize,
    };

    const relations = [
      'account',
      'user',
      'user.parent',
      'offer',
      'flow',
      'landing',
      'app',
      'pp',
    ];

    if (user.group === 'CLIENT' || user.group === 'CLIENT_ADMIN') {
      const [leads, count] = await this.leadRepository.findAndCount({
        where: {
          platform,
          date_create: Between(dateRange.date_start, dateRange.date_end),
        },
        relations,
        ...pagination_common,
      });
      return { leads, count };
    } else if (user.group === 'CLIENT_TEAM_LEAD') {
      // const [offersTemp, count] = await this.leadRepository.findAndCount({
      //   where: { platform },
      //   relations,
      //   ...pagination_common,
      // });
      //
      // const offers = offersTemp.map((el) => {
      //   el.campaignId = campaignId.filter((id) => id.offer.id === el.id);
      //   el.offerByUser = el.offerByUser.filter(
      //     (of) => of.user.parent && of.user.parent.id === user.id,
      //   );
      //   return el;
      // });
      // return { offers, count };
    } else if (user.group === 'CLIENT_TRAFFIC_MANAGER') {
      // const [
      //   offerByUser,
      //   count,
      // ] = await this.offerByUserRepository.findAndCount({
      //   where: {
      //     user: user,
      //   },
      //   relations: [
      //     'offer',
      //     'offer.flows',
      //     'offer.payments',
      //     'offer.sources',
      //     'offer.offerByUser',
      //     'offer.offerByUser.user',
      //   ],
      // });
      // const campaignId = await this.offerCampaignIdRepository.find({
      //   where: { user },
      //   relations: ['user', 'offer'],
      // });
      // const offers = offerByUser.map((el) => {
      //   const offer = el.offer;
      //   offer.campaignId = campaignId.filter((el) => el.offer.id === offer.id);
      //   return offer;
      // });
      // return { offers, count };
    }
  }
}
