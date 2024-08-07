import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from './message.dto';

@Controller('message')
export class MessageController {

    constructor(private readonly messageService: MessageService) { }

    @Post("")
    async createBusiness(@Body() message: Message) {
      try {      
        const response = this.messageService.addMessage(message);
        if (!response) {
          throw new HttpException("message didnt add ", HttpStatus.BAD_REQUEST);
        }
        return response;
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}
