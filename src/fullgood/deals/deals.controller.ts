import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { DealService } from './deals.service';
import { Deal } from './deals.dto';
import { ObjectId } from 'mongoose';

@Controller('deal')
export class DealController {

    constructor(private readonly dealService: DealService) { }

    @Post("")
    async addDeal(@Body() deal: Deal) {
      try {      
        return this.dealService.addDeal(deal);
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    @Get("")
    async getAllDeals() {
      try {
        return this.dealService.getAllDeals();
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Get("auth/:id")
    async getDealById(@Param('id') id: ObjectId) {
      try {
        return this.dealService.getDealById(id);
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
    @Put(":id")
    async updateDealDetails(@Param('id') id: ObjectId, @Body() deal: Deal) {
      try {
        return this.dealService.updateDealDetails(id, deal);
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
    @Put("status/:id")
    async updateDealStatus(@Param('id') id: ObjectId, @Body() deal: Deal) {
      try {
        return this.dealService.updateDealDetails(id, deal );
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
    @Delete(":id")
    async deleteDeal(@Param('id') id: ObjectId) {
      try {
        return this.dealService.deleteDeal(id);
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}


