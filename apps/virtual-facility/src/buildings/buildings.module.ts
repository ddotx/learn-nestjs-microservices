import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service.js';
import { BuildingsController } from './buildings.controller.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from './entities/building.entity.ts';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WORKFLOWS_SERVICE } from '../constants.ts';
 
@Module({
  imports: [
    TypeOrmModule.forFeature([Building]),
    ClientsModule.register([
      {
        name: WORKFLOWS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: process.env.NATS_URL,
        },
      },
    ]),
],
  controllers: [BuildingsController],
  providers: [BuildingsService],
})
export class BuildingsModule {}
