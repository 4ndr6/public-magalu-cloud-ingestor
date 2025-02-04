import { Field, ObjectType } from '@nestjs/graphql';
import { ProductDTO } from '../../product/dto/product.dto';
import { TenantDTO } from '../../tenant/dto/tenant.dto';

@ObjectType()
export class PulseDTO {
  @Field()
  id: string;

  @Field()
  tenantId: string;

  @Field()
  productId: string;

  @Field()
  usedAmount: number;

  @Field()
  useUnity: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => TenantDTO)
  tenant: TenantDTO;

  @Field(() => ProductDTO)
  product: ProductDTO;
}
