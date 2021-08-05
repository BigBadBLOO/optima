//core
import { Repository } from 'typeorm';
import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

//entity
import { User } from '../../../../user/user.entity';
import { AppForIntegration } from '../../../entity/appForIntegration.entity';
import { IntegrationUsers } from '../../../entity/IntegrtionUsers.entity';
import { CabinetIntegration } from '../../../entity/cabinetIntegration.entity';

type TypeUserFBResponse = {
  id: string;
  name: string;
};

@Injectable()
export class FacebookIntegrationService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(AppForIntegration)
    private appForIntegrationRepository: Repository<AppForIntegration>,
    @InjectRepository(IntegrationUsers)
    private integrationUsersRepository: Repository<IntegrationUsers>,
    @InjectRepository(CabinetIntegration)
    private cabinetIntegrationRepository: Repository<CabinetIntegration>,
  ) {}

  async loginFB(user_id: number, token: string): Promise<IntegrationUsers> {
    const app_fb = await this.appForIntegrationRepository.findOne({
      where: { name: 'Facebook' },
    });
    try {
      const url_access_token = `https://graph.facebook.com/v${app_fb.version}/oauth/access_token?grant_type=fb_exchange_token&client_id=${app_fb.uid}&client_secret=${app_fb.key}&fb_exchange_token=${token}`;
      const response = await this.httpService.get(url_access_token).toPromise();
      const access_token = response.data['access_token'];
      const url = `https://graph.facebook.com/v${app_fb.version}/me?fields=name,id&access_token=${access_token}`;
      const answer = await this.httpService.get(url).toPromise();
      const user_response: TypeUserFBResponse = answer.data;
      const account_fb = await this.integrationUsersRepository.findOne({
        where: {
          uid: user_response.id,
        },
      });
      let answer_user;
      if (account_fb) {
        if (account_fb.token === access_token) {
          new Error('Токен не требует замены, обновите токен позже');
        } else {
          account_fb.name = user_response.name;
          account_fb.token = access_token;
          account_fb.token_date_update = new Date();
          answer_user = await this.integrationUsersRepository.save(account_fb);
        }
      } else {
        const owner = await this.userRepository.findOne(user_id);
        const save_user = new IntegrationUsers();
        save_user.uid = user_response.id;
        save_user.name = user_response.name;
        save_user.token = access_token;
        save_user.token_date_update = new Date();
        save_user.app = app_fb;
        save_user.user = owner;
        answer_user = await this.integrationUsersRepository.save(save_user);
      }
      return answer_user;
    } catch {
      throw new Error('Не удалось установить соединение с Facebook');
    }
  }

  async getCabinetsFromFB(account_id: number): Promise<CabinetIntegration[]> {
    const account = await this.integrationUsersRepository.findOne({
      where: { id: account_id },
      relations: ['app'],
    });
    try {
      const url = `https://graph.facebook.com/v${account.app.version}/${account.uid}?fields=adaccounts{name}&access_token=${account.token}`;
      const response = await this.httpService.get(url).toPromise();
      const accounts = response.data.adaccounts.data;
      const answer = [];
      const map_cabinets = async (cabinet) => {
        const saved_cabinet = await this.cabinetIntegrationRepository.findOne({
          where: { uid: cabinet.id },
          relations: ['account'],
        });
        if (saved_cabinet) {
          if (saved_cabinet.account.id === account_id) return;
          answer.push(saved_cabinet);
          return;
        }
        cabinet.uid = cabinet.id;
        delete cabinet.id;
        answer.push(cabinet);
      };
      for (const item of accounts) {
        await map_cabinets(item);
      }
      return answer;
    } catch {
      throw new Error('Не удалось получить список кабинетов');
    }
  }

  async saveFBCabinets(
    account_id: number,
    cabinets: CabinetIntegration[],
  ): Promise<CabinetIntegration[]> {
    const account = await this.integrationUsersRepository.findOne(account_id);
    const response = [];
    for (const item of cabinets) {
      const cabinet_save = new CabinetIntegration();
      cabinet_save.uid = item.uid;
      cabinet_save.name = item.name;
      cabinet_save.account = account;
      response.push(await this.cabinetIntegrationRepository.save(cabinet_save));
    }
    return response;
  }
}
