import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  subject: string;

  @Prop()
  content: string;

  // @Prop()
  // date: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
