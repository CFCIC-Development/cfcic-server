import { seeder } from 'nestjs-seeder';
import { PrismaModule } from './prisma-module/prisma-module.module';
import { ChurchArmSeeder } from './seeder/church-arm.seeder';
import { ChurchCenterSeeder } from './seeder/church-center.seeder';
import { ColonySeeder } from './seeder/colony.seeder';
import { HomeCellSeeder } from './seeder/home-cell.seeder';
import { RoleSeeder } from './seeder/role.seeder';
import { ServiceTeamSeeder } from './seeder/service-team.seeder';
import { EventServiceSeeder } from './seeder/event-service.seeder';

seeder({
  imports: [PrismaModule],
}).run([
  ChurchArmSeeder,
  ChurchCenterSeeder,
  ColonySeeder,
  HomeCellSeeder,
  RoleSeeder,
  ServiceTeamSeeder,
  EventServiceSeeder,
]);
