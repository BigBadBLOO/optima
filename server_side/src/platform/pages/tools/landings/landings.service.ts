import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { User } from '../../../../user/user.entity';
import { Pagination, Platform } from '../../../entity/platform.entity';
import { Offer } from '../../../entity/offers.entity';
import { Landing, LandingsAndCount } from '../../../entity/landing.entity';
import { AddLandingDTO } from './dto/addLanding.dto';
import { UpdateLandingDTO } from './dto/updateLanding.dto';
import { DeleteLandingDTO } from './dto/deleteLanding.dto';
import { UserService } from '../../../../user/user.service';

@Injectable()
export class LandingsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>,
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(Landing)
    private landingRepository: Repository<Landing>,
  ) {}

  async getListLandings(
    user_id: number,
    platformName: string,
    pagination: Pagination,
    isLanding: boolean,
  ): Promise<LandingsAndCount> {
    const [user, platform] = await this.userService.findUserAndPlatform(
      user_id,
      platformName,
    );

    const default_order = {};

    pagination.sortBy.forEach((el: { id; desc: boolean }) => {
      default_order[el.id] = el.desc ? 'DESC' : 'ASC';
    });

    const pagination_common: FindManyOptions<Landing> = {
      order: default_order,
      skip: pagination.pageIndex * pagination.pageSize,
      take: pagination.pageSize,
    };

    const relations = [
      'offer',
      'offer.flows',
      'offer.payments',
      'account',
      'flow',
      'payment',
      'landingsByFlow',
    ];
    if (
      user.group === 'CLIENT' ||
      user.group === 'CLIENT_ADMIN' ||
      user.group === 'CLIENT_TEAM_LEAD'
    ) {
      const [landings, count] = await this.landingRepository.findAndCount({
        where: {
          isLanding: isLanding,
          platform,
        },
        relations,
        ...pagination_common,
      });
      return { landings, count };
    } else if (user.group === 'CLIENT_TRAFFIC_MANAGER') {
      const [landings, count] = await this.landingRepository.findAndCount({
        where: {
          isLanding: isLanding,
          platform,
          account: user,
        },
        relations,
        ...pagination_common,
      });
      return { landings, count };
    }
  }

  async getLandings(user_id: number, platformName: string): Promise<Landing[]> {
    const [user, platform] = await this.userService.findUserAndPlatform(
      user_id,
      platformName,
    );
    if (
      user.group === 'CLIENT' ||
      user.group === 'CLIENT_ADMIN' ||
      user.group === 'CLIENT_TEAM_LEAD'
    ) {
      return await this.landingRepository.find({
        where: {
          platform,
        },
        relations: ['offer'],
      });
    } else if (user.group === 'CLIENT_TRAFFIC_MANAGER') {
      return await this.landingRepository.find({
        where: {
          platform,
          account: user,
        },
        relations: ['offer'],
      });
    }
  }

  async addLanding(
    addLandingData: AddLandingDTO,
    account_id: number,
  ): Promise<Landing> {
    const [user, platform] = await this.userService.findUserAndPlatform(
      account_id,
      addLandingData.platform.platformName,
    );
    addLandingData.account = user;
    addLandingData.platform = platform;
    return await this.landingRepository.save(addLandingData);
  }

  async updateLanding(updateLandingData: UpdateLandingDTO): Promise<Landing> {
    return await this.landingRepository.save(updateLandingData);
  }

  async deleteLanding(deleteLandingData: DeleteLandingDTO): Promise<string> {
    await this.landingRepository.delete(deleteLandingData.id);
    return 'Данные успешно удалены';
  }
}
