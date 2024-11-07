import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Deal, Status } from './deals.dto';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class DealService {
    constructor(@InjectModel("Deal")private readonly dealModel: Model<Deal>) { }
    //הסטטוס לא נוסף לעסק
    async addDeal(deal: Deal): Promise<Deal> {
        //phone valid
        const regexphone = /^0+[1-9]{1,2}-?[0-9]{7}$/;

        // const regexphone = /^0+[1-9]+[0-9]{3}$/;
        if (!regexphone.test(deal.phone))
          throw new HttpException("פלאפון לא תקין", HttpStatus.BAD_REQUEST);
        //mail valid
        const regexmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!regexmail.test(deal.mail))
          throw new HttpException("מייל לא תקין", HttpStatus.BAD_REQUEST);
        if (await this.dealModel.findOne({ mail: deal.mail }))
          throw new HttpException("מייל זה קיים במערכת", HttpStatus.BAD_REQUEST);
        const newDeal= new this.dealModel(deal);
        let save: Deal;
        if (newDeal)
          {  newDeal.status=Status.CONNECTED
            save = await newDeal.save();}
        else
            throw new HttpException("המשתמש לא הוכנס למערכת", HttpStatus.BAD_REQUEST);
        return save;   
    }

    async getAllDeals(): Promise<Deal[]> {
        //לסנן
        //יש בעיה עם הסטטוס
        const deals=await this.dealModel.find();
        return deals.filter((d)=>d.status===Status.CONNECTED) ;
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

//יש בעיה בתרגום מ_Id לDeal
    async updateDealDetails(dealId: ObjectId, deal: Deal): Promise<Deal> {
        const deal1 = this.getDealById(dealId);
        return await  this.dealModel.findByIdAndUpdate(deal1, deal, {new: true});
    }

//יש בעיה בתרגום מ_Id לDeal
    async updateUserStatus(dealId: ObjectId): Promise<Deal> {
        const deal = this.getDealById(dealId);
        return await this.dealModel.findByIdAndUpdate(deal, {status: Status.DETACHED}, {new: true});
    }

    async deleteDeal(dealId: ObjectId): Promise<Deal> {
        return await this.dealModel.findByIdAndUpdate({_id: dealId}, 
            {status: Status.BLOCKED},
             {new: true});
    }
}
//אין לי גישה עם הכתובת IP שלי