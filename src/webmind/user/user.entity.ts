import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Status } from "../generic/status";

@Schema({ timestamps: true })
export class User extends Document {
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
  password: string;

  @Prop({
    required: true,
    default: Status.CONNECTED
  })
  status: Status;
}

export const UserSchema = SchemaFactory.createForClass(User);