import { Module } from '@nestjs/common';
import { WorkflowServiceController } from './workflow-service.controller.js';
import { WorkflowServiceService } from './workflow-service.service.js';
import { WorkflowsModule } from './workflows/workflows.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './health/health.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
    }),
    WorkflowsModule,
    HealthModule,
  ],
  controllers: [WorkflowServiceController],
  providers: [WorkflowServiceService],
})
export class WorkflowServiceModule {}
