import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './message.dto';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
    
    constructor(@InjectModel("Message")private readonly messageModel: Model<Message>) { }

    async addMessage(message: Message): Promise<Message> {
        const newMessage = new this.messageModel(message);
        let save: Message;
        if (newMessage)     
            save = await newMessage.save();
        else
            throw new HttpException("ההודעה לא הוכנסה למערכת", HttpStatus.BAD_REQUEST);
        return save;   
    }

}
