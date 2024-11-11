import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.dto';

@Controller('message')
export class MessageController {

    constructor(private readonly messageService: MessageService) { }

    @Post("")
    async addMessage(@Body() message: Message) {
      try {      
        return this.messageService.addMessage(message);
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}
