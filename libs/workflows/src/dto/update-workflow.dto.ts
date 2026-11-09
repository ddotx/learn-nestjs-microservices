import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkflowDto } from './create-workflow.dto.ts';

export class UpdateWorkflowDto extends PartialType(CreateWorkflowDto) {}