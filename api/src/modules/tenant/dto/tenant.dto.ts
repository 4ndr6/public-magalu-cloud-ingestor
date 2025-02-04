import { Field, ObjectType } from '@nestjs/graphql';
import { PulseDTO } from '../../pulse/dto/pulse.dto';

@ObjectType()
export class TenantDTO {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => [PulseDTO])
  pulses: PulseDTO[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
