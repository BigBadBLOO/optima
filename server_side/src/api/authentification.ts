import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Any, Repository } from 'typeorm';
import { Landing } from '../platform/entity/landing.entity';
import { FlowDomain } from '../platform/entity/flow.entity';
import * as punycode from 'punycode';

@Injectable()
export class GuardApiByDomain implements CanActivate {
  constructor(
    @InjectRepository(Landing)
    private landingRepository: Repository<Landing>,
    @InjectRepository(FlowDomain)
    private flowDomainRepository: Repository<FlowDomain>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const url = request.header('Origin').split('//');
      const reqUrl = punycode.toUnicode(url[1]);
      const flowDomain = await this.flowDomainRepository.findOne({
        where: {
          url: Any([
            `${url[0] + '//' + reqUrl}`,
            `${url[0] + '//' + reqUrl + '/'}`,
            `${url[0] + '//' + url[1]}`,
            `${url[0] + '//' + url[1] + '/'}`,
          ]),
        },
      });
      if (flowDomain) return true;
      const landing = await this.landingRepository.findOne({
        where: {
          url: Any([
            `${url[0] + '//' + reqUrl}`,
            `${url[0] + '//' + reqUrl + '/'}`,
            `${url[0] + '//' + url[1]}`,
            `${url[0] + '//' + url[1] + '/'}`,
          ]),
        },
      });
      if (landing) return true;
    } catch (e) {
      return false;
    }

    return false;
  }
}
