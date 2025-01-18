import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Order extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  product: string;

  @Prop({ required: true })
  price: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
