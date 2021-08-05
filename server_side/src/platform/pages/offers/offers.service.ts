import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer, OffersAndCount } from '../../entity/offers.entity';
import { Any, FindManyOptions, IsNull, Not, Repository } from 'typeorm';
import { User } from '../../../user/user.entity';
import { Pagination, Platform } from '../../entity/platform.entity';
import { IntegrationUsers } from '../../entity/IntegrtionUsers.entity';
import FactoryService from '../../entity/platforms/factoryService';
import { AddOfferDTO } from './dto/addOffer.dto';
import { UpdateOfferDTO } from './dto/updateOffer.dto';
import { DeleteOfferDTO } from './dto/deleteOffer.dto';
import {
  OfferByUser,
  OfferCampaignId,
  OfferFlow,
  OfferPayment,
  OfferSource,
} from '../../entity/offers.addition.entity';
import { UserService } from '../../../user/user.service';

@Injectable()
export class OffersService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>,
    @InjectRepository(IntegrationUsers)
    private integrationUsersRepository: Repository<IntegrationUsers>,
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    @InjectRepository(OfferByUser)
    private offerByUserRepository: Repository<OfferByUser>,
    @InjectRepository(OfferCampaignId)
    private offerCampaignIdRepository: Repository<OfferCampaignId>,
    @InjectRepository(OfferFlow)
    private offerFlowRepository: Repository<OfferFlow>,
    @InjectRepository(OfferPayment)
    private offerPaymentRepository: Repository<OfferPayment>,
    @InjectRepository(OfferSource)
    private offerSourceRepository: Repository<OfferSource>,
  ) {}

  async getListOffers(
    user_id: number,
    platformName: string,
    pagination: Pagination,
  ): Promise<OffersAndCount> {
    const [user, platform] = await this.userService.findUserAndPlatform(
      user_id,
      platformName,
    );

    const default_order = {};

    pagination.sortBy.forEach((el: { id; desc: boolean }) => {
      default_order[el.id] = el.desc ? 'DESC' : 'ASC';
    });

    const pagination_common: FindManyOptions<Offer> = {
      order: default_order,
      skip: pagination.pageIndex * pagination.pageSize,
      take: pagination.pageSize,
    };

    const relations = [
      'flows',
      'payments',
      'sources',
      'campaignId',
      'campaignId.user',
      'offerByUser',
      'offerByUser.user',
      'offerByUser.user.parent',
    ];

    if (user.group === 'CLIENT' || user.group === 'CLIENT_ADMIN') {
      // eslint-disable-next-line prefer-const
      let [offers, count] = await this.offerRepository.findAndCount({
        where: { platform },
        relations,
        ...pagination_common,
      });
      return { offers, count };
    } else if (user.group === 'CLIENT_TEAM_LEAD') {
      const [offersTemp, count] = await this.offerRepository.findAndCount({
        where: { platform },
        relations,
        ...pagination_common,
      });
      const campaignId = await this.offerCampaignIdRepository.find({
        where: {
          user: {
            id: Any([...user.children.map((el) => el.id), user.id]),
          },
        },
        relations: ['user', 'offer'],
      });
      const offers = offersTemp.map((el) => {
        el.campaignId = campaignId.filter((id) => id.offer.id === el.id);
        el.offerByUser = el.offerByUser.filter(
          (of) => of.user.parent && of.user.parent.id === user.id,
        );
        return el;
      });
      return { offers, count };
    } else if (user.group === 'CLIENT_TRAFFIC_MANAGER') {
      const [
        offerByUser,
        count,
      ] = await this.offerByUserRepository.findAndCount({
        where: {
          user: user,
        },
        relations: [
          'offer',
          'offer.flows',
          'offer.payments',
          'offer.sources',
          'offer.offerByUser',
          'offer.offerByUser.user',
        ],
      });
      const campaignId = await this.offerCampaignIdRepository.find({
        where: { user },
        relations: ['user', 'offer'],
      });
      const offers = offerByUser.map((el) => {
        const offer = el.offer;
        offer.campaignId = campaignId.filter((el) => el.offer.id === offer.id);
        return offer;
      });
      return { offers, count };
    }
  }

  async getListExternalOffers(account_id: number): Promise<Offer[]> {
    const account = await this.integrationUsersRepository.findOne(account_id, {
      relations: ['app'],
    });
    const factory = new FactoryService();
    const service = factory.getService(account);
    return service.getOffers();
  }

  async addOffer(
    addOfferData: AddOfferDTO,
    account_id: number,
  ): Promise<Offer> {
    const [user, platform] = await this.userService.findUserAndPlatform(
      account_id,
      addOfferData.platform.platformName,
    );
    addOfferData.account = user;
    addOfferData.platform = platform;
    return await this.offerRepository.save(addOfferData);
  }

  async updateOffer(
    user_id: number,
    updateOfferData: UpdateOfferDTO,
  ): Promise<Offer> {
    const user = await this.userRepository.findOne(user_id, {
      relations: ['platform', 'children'],
    });

    const { campaignId, offerByUser, ...data } = updateOfferData;

    const offer = await this.offerRepository.save(data);
    const arrWithUid = campaignId.map((el) => el.uid);
    const arrWithUserId = offerByUser.map((el) => el.user.id);
    if (user.group === 'CLIENT' || user.group === 'CLIENT_ADMIN') {
      await this.offerCampaignIdRepository.delete({
        uid: Not(Any(arrWithUid)),
        offer,
      });
      await this.offerByUserRepository.delete({
        offer,
        user: {
          id: Not(Any(arrWithUserId)),
        },
      });
    } else if (user.group === 'CLIENT_TEAM_LEAD') {
      const childrenUserId = user.children.map((el) => el.id);
      await this.offerCampaignIdRepository.delete({
        user: {
          id: Any([...childrenUserId, user.id]),
        },
        uid: Not(Any(arrWithUid)),
        offer,
      });
      await this.offerByUserRepository.delete({
        offer,
        user: {
          id: Any([...childrenUserId, user.id]),
        },
      });
    } else if (user.group === 'CLIENT_TRAFFIC_MANAGER') {
      await this.offerCampaignIdRepository.delete({
        user,
        uid: Not(Any(arrWithUid)),
        offer,
      });
    }

    const campaignId_exist = await this.offerCampaignIdRepository.find({
      where: {
        uid: Any(arrWithUid),
      },
    });

    await this.offerCampaignIdRepository.save(
      campaignId
        .filter((el) => !campaignId_exist.find((exist) => el.uid === exist.uid))
        .map((el) => {
          el.offer = offer;
          return el;
        }),
    );

    const offerByUserExists = await this.offerByUserRepository.find({
      where: {
        user: {
          id: Any(arrWithUserId),
        },
      },
      relations: ['user'],
    });

    await this.offerByUserRepository.save(
      offerByUser
        .filter(
          (el) =>
            !offerByUserExists.find((exist) => el.user.id === exist.user.id),
        )
        .map((el) => {
          el.offer = offer;
          return el;
        }),
    );

    //deleting all null foreignKey
    await this.offerFlowRepository.delete({
      offer: IsNull(),
    });

    await this.offerPaymentRepository.delete({
      offer: IsNull(),
    });

    await this.offerSourceRepository.delete({
      offer: IsNull(),
    });
    return offer;
  }

  async deleteOffer(deleteOfferData: DeleteOfferDTO): Promise<string> {
    await this.offerRepository.delete(deleteOfferData.id);
    return 'Данные успешно удалены';
  }
}
