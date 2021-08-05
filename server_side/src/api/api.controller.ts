import { Body, Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { ApiFlowDTO, ApiLandingDTO, ApiLandingLeadDTO } from './dto/flow.dto';
import { GuardApiByDomain } from './authentification';
import { ApiService } from './api.service';
import { Lead } from '../platform/entity/lead.entity';

@Controller('api/v1')
export class ApiController {
  constructor(@Inject(ApiService) private apiService: ApiService) {}

  @UseGuards(GuardApiByDomain)
  @Post('flow')
  async flow(@Body() body: ApiFlowDTO): Promise<{ landing_url: string }> {
    const id = body.id;
    const utm = body.utm_content;
    const flow = await this.apiService.getFlow(id);
    let landing = await this.apiService.getUrl(flow, false);
    if (!landing) {
      landing = await this.apiService.getUrl(flow, true);
    }
    const storage = await this.apiService.workWithStorage(
      null,
      flow,
      landing,
      utm,
    );

    const url = landing
      ? landing.url + `?id=${id}&storage_id=${storage.id}&isLanding=false`
      : '';
    return { landing_url: url };
  }

  @UseGuards(GuardApiByDomain)
  @Post('prelanding')
  async prelanding(
    @Body() body: ApiLandingDTO,
  ): Promise<{ landing_url: string }> {
    const id = body.id;
    const utm = body.utm_content;
    const storage_id = body.storage_id;
    const landing_id = body.landing_id;

    const flow = await this.apiService.getFlow(id);
    let landing = await this.apiService.getUrl(flow, true);
    if (!landing) {
      landing = await this.apiService.getUrl(flow, true);
    }
    const storage = await this.apiService.workWithStorage(
      storage_id,
      flow,
      landing,
      utm,
    );
    if (landing_id) {
      const prelanding = await this.apiService.getLanding(landing_id);
      await this.apiService.workWithStorage(storage.id, null, prelanding);
    }

    const url = landing
      ? landing.url + `?id=${id}&isLanding=true&storage_id=${storage.id}`
      : '';
    return { landing_url: url };
  }

  @UseGuards(GuardApiByDomain)
  @Post('landing')
  async landing(
    @Body() body: ApiLandingDTO,
  ): Promise<{ success: boolean; storage_id?: string | number }> {
    const id = body.id;
    const utm = body.utm_content;
    const storage_id = body.storage_id;
    const landing_id = body.landing_id;

    const flow = await this.apiService.getFlow(id);

    const storage = await this.apiService.workWithStorage(
      storage_id,
      flow,
      null,
      utm,
      true,
    );
    if (landing_id) {
      const landing = await this.apiService.getLanding(landing_id);
      await this.apiService.workWithStorage(storage.id, null, landing);
    }
    return { success: true, storage_id: storage.id };
  }

  @UseGuards(GuardApiByDomain)
  @Post('landingLead')
  async landingLead(
    @Body() body: ApiLandingLeadDTO,
    @Req() req: Request,
  ): Promise<{ success: boolean }> {
    const storage_id = body.storage_id;
    const name = body.name;
    const phone = body.phone;
    const birth = body.birth;
    const comment = body.comment;
    let storage = await this.apiService.workWithStorage(
      storage_id,
      null,
      null,
      null,
      null,
      true,
    );

    storage = await this.apiService.getStorage(storage.id);

    let payment = 0;
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        req.headers['user-agent'],
      )
    ) {
      payment = storage.landing ? storage.landing.payment.paymentMobile : 0;
    } else {
      payment = storage.landing ? storage.landing.payment.paymentDesktop : 0;
    }
    console.log(storage.landing);
    const lead = new Lead();
    lead.ad_id = storage.utm;
    lead.name = name;
    lead.phone = phone;
    lead.birth = birth;
    lead.comment = comment;
    lead.flow = storage.flow;
    lead.flow_name = storage.flow ? storage.flow.name : '-';
    lead.geo =
      storage.landing && storage.landing.payment
        ? storage.landing.payment.name
        : '-';
    lead.app = storage.flow && storage.flow.app;
    lead.pp =
      storage.landing && storage.landing.offer && storage.landing.offer.app;
    lead.prelanding = storage.prelanding;
    lead.prelanding_name = storage.prelanding ? storage.prelanding.name : '-';
    lead.landing = storage.landing;
    lead.landing_name = storage.landing ? storage.landing.name : '-';
    lead.offer = storage.landing && storage.landing.offer;
    lead.offer_name = storage.landing ? storage.landing.offer.name : '-';
    lead.user = storage.landing && storage.landing.account;
    lead.platform = storage.landing && storage.landing.platform;
    lead.payment = payment;
    lead.isDouble = await this.apiService.leadIsDouble(lead.phone, lead.offer);
    await this.apiService.saveLead(lead);
    return { success: true };
  }
}
