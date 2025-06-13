import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from './address.schema';
@Schema()
export class User extends Document {
  @Prop()
  name: string;
  @Prop({ type: Address })
  Address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);
