import { Field, ObjectType } from '@nestjs/graphql';
import { PulseDTO } from '../../pulse/dto/pulse.dto';

@ObjectType()
export class ProductDTO {
  @Field()
  id: string;

  @Field()
  sku: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [PulseDTO])
  pulses: PulseDTO[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
