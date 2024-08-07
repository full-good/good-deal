import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop()
  name: string;

  @Prop()
  mail: string;

  @Prop()
  subject: string;

  @Prop()
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
