import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, ObjectId } from "mongoose";

@Schema({ timestamps: true })
export class Dress extends Document {
  @Prop({  required: true })
  userId: ObjectId;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  size: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  more: string;
}

export const DressSchema = SchemaFactory.createForClass(Dress);