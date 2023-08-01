import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma-module/prisma.service';
import {
  PartArm,
  ProfileCreationDto,
  RolesAndResp,
  ServTeam,
} from './profile.types';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async fetchUserProfileById({ id }: { id: string }) {
    const profile = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
        display_picture: true,
        profile: {
          include: {
            church_centre: {
              select: { name: true, id: true },
            },
            home_cell: {
              select: { name: true, id: true },
            },
            colony: {
              select: { name: true, id: true },
            },
            roles_and_responsibilities: {
              select: {
                role_responsibility: { select: { name: true, id: true } },
              },
            },
            service_team: {
              select: { service_team: { select: { name: true, id: true } } },
            },
            partnered_arms: {
              select: { church_arm: { select: { name: true, id: true } } },
            },
            dependents: {
              select: {
                first_name: true,
                last_name: true,
                birthday: true,
                emergency_contact: true,
                allergies: true,
                id: true,
              },
            },
          },
        },
      },
    });

    return profile;
  }

  private mapToIdObjects(
    key: 'role_responsibility' | 'service_team' | 'church_arm',
    array: number[],
  ): unknown[] {
    if (!array) return null;
    return array.map((item: number) => {
      return {
        [key]: {
          connect: { id: item },
        },
      };
    });
  }

  async createUserProfile(input: ProfileCreationDto, userId: string) {
    if (!input.is_church_member) {
      const nonMemberProfile = await this.prismaService.profile.create({
        data: {
          phone_number: input.phone_number,
          occupation: input.occupation,
          birthday: new Date(input.birthday),
          marital_status: input.marital_status,
          marriage_anniversary: new Date(input.marriage_anniversary),
          is_church_member: input.is_church_member,
          user: {
            connect: { id: userId },
          },
        },
      });

      return nonMemberProfile;
    }

    const rolesArray = this.mapToIdObjects(
      'role_responsibility',
      input.roles_and_responsibilities,
    );
    const serviceTeamsArray = this.mapToIdObjects(
      'service_team',
      input.service_team,
    );
    const partneredArmsArray = this.mapToIdObjects(
      'church_arm',
      input.partnered_arms,
    );

    const transformedDependents = input.dependents.map((dependent) => {
      return {
        ...dependent,
        birthday: new Date(dependent.birthday),
      };
    });

    const memberProfile = await this.prismaService.profile.create({
      data: {
        phone_number: input.phone_number,
        occupation: input.occupation,
        birthday: new Date(input.birthday),
        marital_status: input.marital_status,
        marriage_anniversary: new Date(input.marriage_anniversary),
        is_church_member: input.is_church_member,
        church_join_date: new Date(input.church_join_date),
        growth_track_completed: input.growth_track_completed,
        is_tither: input.is_tither,
        is_partner: input.is_partner,
        payment_interval: input.payment_interval,
        church_centre: {
          connect: { id: input.church_centre_id },
        },
        home_cell: {
          connect: { id: input.home_cell_id },
        },
        colony: {
          connect: { id: input.colony_id },
        },
        user: {
          connect: { id: userId },
        },
        roles_and_responsibilities: {
          create: rolesArray as RolesAndResp[],
        },
        service_team: {
          create: serviceTeamsArray as ServTeam[],
        },
        partnered_arms: {
          create: partneredArmsArray as PartArm[],
        },
        dependents: {
          createMany: {
            data: transformedDependents,
          },
        },
      },
    });

    return memberProfile;
  }
}
