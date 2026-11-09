import { NestFactory } from '@nestjs/core';
import { WorkflowServiceModule } from './workflow-service.module.js';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(WorkflowServiceModule);
  app.useGlobalPipes(new ValidationPipe());
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.NATS,
      options: {
        servers: process.env.NATS_URL,
      },
    },
    {
      inheritAppConfig: true,
    },
  );
  await app.startAllMicroservices();
  await app.listen(3001);
}
await bootstrap();
