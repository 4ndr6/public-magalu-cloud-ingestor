import { Field, ObjectType } from '@nestjs/graphql';
import { PulseDTO } from '../../pulse/dto/pulse.dto';
import { Prisma } from '@prisma/client';
import { IsUUID } from 'class-validator';

@ObjectType()
export class CreateTenantDTO {
  @IsUUID(4)
  @Field(() => String, { nullable: false })
  id?: string;

  @Field()
  name: string;

  @Field(() => [PulseDTO])
  pulses: PulseDTO[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
