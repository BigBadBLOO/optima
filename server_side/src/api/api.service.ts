import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Landing } from '../platform/entity/landing.entity';
import {Raw, Repository} from 'typeorm';
import { Flow } from '../platform/entity/flow.entity';
import { StorageFlow } from '../platform/entity/storage.entity';
import { Lead } from '../platform/entity/lead.entity';

@Injectable()
export class ApiService {
  constructor(
    @InjectRepository(Flow)
    private flowRepository: Repository<Flow>,
    @InjectRepository(StorageFlow)
    private storageFlowRepository: Repository<StorageFlow>,
    @InjectRepository(Landing)
    private landingRepository: Repository<Landing>,
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
  ) {}

  async getFlow(flow_id: string | number): Promise<Flow> {
    return await this.flowRepository.findOne({
      where: {
        id: flow_id,
      },
      relations: ['landingsByFlow', 'landingsByFlow.landing'],
    });
  }

  async getLanding(landing_id: string | number): Promise<Landing> {
    return await this.landingRepository.findOne(landing_id);
  }

  async getStorage(storage_id: string | number): Promise<StorageFlow> {
    return await this.storageFlowRepository.findOne({
      where: {
        id: storage_id,
      },
      relations: [
        'flow',
        'flow.app',
        'prelanding',
        'landing',
        'landing.offer',
        'landing.offer.app',
        'landing.account',
        'landing.platform',
        'landing.payment',
      ],
    });
  }

  async getUrl(flow: Flow, isLanding: boolean): Promise<Landing> {
    const landingsByFlow = flow.landingsByFlow
      .filter((el) => el.useInFlow)
      .filter((el) => el.landing.isLanding === isLanding);
    const weights = landingsByFlow.map((el) => el.percent);
    const index = weightedRandom(weights);
    if (index >= 0) {
      return landingsByFlow[index].landing;
    }
    return null;
  }

  async workWithStorage(
    storage_id: string | number,
    flow?: Flow,
    landing?: Landing,
    utm?: string,
    cameToLanding?: boolean,
    isLeadCame?: boolean,
  ): Promise<StorageFlow> {
    let storage = new StorageFlow();
    if (storage_id) {
      storage = await this.storageFlowRepository.findOne(storage_id);
    }
    if (utm) storage.utm = utm;
    if (cameToLanding) {
      storage.cameToLanding = cameToLanding;
    }
    if (isLeadCame) {
      storage.isLeadCame = isLeadCame;
    }
    if (flow) {
      storage.flow = flow;
    }
    if (landing) {
      if (landing.isLanding) {
        storage.landing = landing;
      } else {
        storage.prelanding = landing;
      }
    }
    return await this.storageFlowRepository.save(storage);
  }

  async saveLead(lead: Lead): Promise<void> {
    await this.leadRepository.save(lead);
  }
  async leadIsDouble(phone: string, offer): Promise<boolean> {
    const day_delta = 180 * 24 * 60 * 60 * 1000;
    const date_now = new Date();
    const date = new Date(date_now.getTime() - day_delta);
    const lead = await this.leadRepository.findOne({
      where: {
        phone,
        date_create: Raw((alias) => `${alias} > :date`, { date }),
        offer,
      },
      relations: ['offer'],
    });
    return !!lead;
  }
}

function weightedRandom(prob: number[]) {
  const resultArr: number[] = [];
  for (let i = 0; i < prob.length; i++) {
    const r = Math.random();
    resultArr.push(r * prob[i]);
  }
  return resultArr.indexOf(Math.max.apply(null, resultArr));
}
