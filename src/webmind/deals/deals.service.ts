import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Deal } from './deals.dto';
import { Status } from '../generic/status';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class DealService {
    constructor(@InjectModel("Deal")private readonly dealModel: Model<Deal>) { }

    async addDeal(deal: Deal): Promise<Deal> {
        this.validDealDetails(deal);
        if (await this.dealModel.findOne({ mail: deal.mail }))
            throw new HttpException("מייל זה קיים במערכת", HttpStatus.BAD_REQUEST);
        const newDeal= new this.dealModel(deal);
        let save: Deal;
        if (newDeal)
            save = await newDeal.save();
        else
            throw new HttpException("העסק לא הוכנס למערכת", HttpStatus.BAD_REQUEST);
        return save;   
    }

    async getAllDeals(): Promise<Deal[]> {
        const deals = await this.dealModel.find();
        return deals.filter(d => d.status === Status.CONNECTED) ;
    }

    async getDealById(dealId: ObjectId): Promise<Deal> {
        const deal = await this.dealModel.findById({_id: dealId});
        if(!deal)
            throw new HttpException("עסק לא קיים", HttpStatus.BAD_REQUEST);
        if(deal.status === Status.DETACHED)
            throw new HttpException("העסק לא מחובר למערכת", HttpStatus.BAD_REQUEST);
        if(deal.status === Status.BLOCKED)
            throw new HttpException("העסק נמחק", HttpStatus.BAD_REQUEST);
        return deal;
    }

    async updateDealDetails(dealId: ObjectId, deal: Deal): Promise<Deal> {
        this.validDealDetails(deal);
        const deal1 = await this.getDealById(dealId);
        return await  this.dealModel.findByIdAndUpdate(deal1, deal, {new: true});
    }

    async updateDealToStopPublish(dealId: ObjectId): Promise<Deal> {
        const deal = await this.getDealById(dealId);
        return await this.dealModel.findByIdAndUpdate(deal, {status: Status.DETACHED}, {new: true});
    }

    async updateDealToPublish(dealId: ObjectId): Promise<Deal> {
        const deal = await this.dealModel.findById({_id: dealId});
        if(!deal)
            throw new HttpException("עסק לא קיים", HttpStatus.BAD_REQUEST);
        if(deal.status === Status.BLOCKED)
            throw new HttpException("העסק נמחק", HttpStatus.BAD_REQUEST);
        return await this.dealModel.findByIdAndUpdate(deal, {status: Status.CONNECTED}, {new: true});
    }

    async deleteDeal(dealId: ObjectId): Promise<Deal> {
        return await this.dealModel.findByIdAndUpdate({_id: dealId}, {status: Status.BLOCKED}, {new: true});
    }

    validDealDetails(deal: Deal): string {
        const regexphone = /^0+[0-9]{1,2}-?[0-9]{7}$/;
        if (!regexphone.test(deal.phone))
            throw new HttpException("טלפון לא תקין", HttpStatus.BAD_REQUEST);
        const regexmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!regexmail.test(deal.mail))
            throw new HttpException("מייל לא תקין", HttpStatus.BAD_REQUEST);
        return "ok";
    }
}