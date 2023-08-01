import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-module/prisma.service';
import { CreateWalkInDto } from './walk-in.types';

@Injectable()
export class WalkInService {
  constructor(private readonly prismaService: PrismaService) {}

  async createWalkIn(input: CreateWalkInDto): Promise<any> {
    return this.prismaService.walkIn.create({
      data: {
        first_name: input.first_name,
        last_name: input.last_name,
        phone_number: input.phone_number,
        email: input.email,
        is_church_member: input.is_church_member,
        how_heard_about_program: input.how_heard_about_program,
        is_partner: input.is_partner,
        event: {
          connect: {
            id: input.event_id,
          },
        },
      },
    });
  }

  async getEventWalkIns(event_id: string): Promise<any> {
    return this.prismaService.walkIn.findMany({
      where: {
        event_id: event_id,
      },
    });
  }
}
