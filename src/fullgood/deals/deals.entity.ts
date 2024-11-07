import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Status } from "./deals.dto";

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

  @Prop({
    required: true
  })
  website: string;

  @Prop({
    required: true
  })
  logo: string;
  @Prop({
    required: true
  })
  status: Status;
}

export const DealSchema = SchemaFactory.createForClass(Deal);
