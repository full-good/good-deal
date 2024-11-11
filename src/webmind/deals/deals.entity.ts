import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Status } from "../generic/status";

@Schema({ timestamps: true })
export class Deal extends Document {
  @Prop({
    required: true
  })
  nameDeal: string;

  @Prop({
    required: true
  })
  name: string;
  
 @Prop({
    required: true
  })
  phone: string;

  @Prop({
    required: true
  })
  mail: string;

  @Prop({
    required: true
  })
  city: string;

  @Prop()
  website: string;

  @Prop({
    required: true
  })
  logo: string;
  
  @Prop({
    required: true,
    default: Status.CONNECTED
  })
  status: Status;
}

export const DealSchema = SchemaFactory.createForClass(Deal);
