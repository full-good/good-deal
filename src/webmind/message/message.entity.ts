import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({
    required: true
  })
  name: string;

  @Prop({
    required: true
  })
  mail: string;

  @Prop({
    required: true
  })
  subject: string;

  @Prop({
    required: true
  })
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
