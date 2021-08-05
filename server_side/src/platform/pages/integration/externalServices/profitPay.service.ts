//core
import { Repository } from 'typeorm';
import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

//entity
import { IntegrationUsers } from '../../../entity/IntegrtionUsers.entity';

@Injectable()
export class ProfitPayIntegrationService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(IntegrationUsers)
    private integrationUsersRepository: Repository<IntegrationUsers>,
  ) {}

  async statusAccount(account_id: number): Promise<boolean> {
    let status = false;
    const account = await this.integrationUsersRepository.findOne(account_id);
    try {
      const url = `https://dashboard.profitpay.pro/api/wm/flows.json?id=${account.uid}-${account.token}`;
      const response = await this.httpService.get(url).toPromise();
      if (!(response.data.status === 'error')) {
        status = true;
      }
    } catch {}
    return status;
  }
}
