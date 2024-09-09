import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { DressService } from './dress.service';
import { Dress } from './dress.dto';
import { ObjectId } from 'mongoose';

@Controller('dress')
export class DressController {
  constructor(private readonly dressService: DressService) { }

  @Post(":userId")
  async addDress(@Param('userId') userId: ObjectId, @Body() dress: Dress) {
    try {
      dress.userId = userId
      return this.dressService.addDress(dress);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get("")
  async getAllDresses() {
    try {
      return this.dressService.getAllDress();
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(":id")
  async getDressById(@Param('id') id: ObjectId) {
    try {
      return this.dressService.getDressById(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put("")
  async updateDressDetails(@Body() dress: Dress) {
    try {
      return this.dressService.updateDressDetails(dress.userId, dress);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(":id")
  async deleteDress(@Param('id') id: ObjectId) {
    try {
      return this.dressService.deleteDress(id);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}