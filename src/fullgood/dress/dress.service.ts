import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dress } from './dress.dto';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class DressService {

    constructor(@InjectModel("Dress") private readonly DressModel: Model<Dress>) { }

    async addDress(Dress: Dress): Promise<Dress> {
        const regexmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!regexmail.test(Dress.mail))
            throw new HttpException("מייל לא תקין", HttpStatus.BAD_REQUEST);

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(Dress.phone))
            throw new HttpException("מספר טלפון לא חוקי", HttpStatus.BAD_REQUEST);

        if (await this.DressModel.findOne({ userId: Dress.userId }))
            throw new HttpException("משתמש זה לא קיים במערכת", HttpStatus.BAD_REQUEST);

        const newDress = new this.DressModel(Dress);
        let save: Dress;
        if (newDress)
            save = await newDress.save();
        else
            throw new HttpException("השמלה לא הוכנסה למערכת", HttpStatus.BAD_REQUEST);
        return save;
    }

    async getAllDress(): Promise<Dress[]> {
        return await this.DressModel.find();
    }

    async getDressById(DressId: ObjectId): Promise<Dress> {
        const Dress = await this.DressModel.findById({ _id: DressId });
        if (!Dress)
            throw new HttpException("שמלה לא קיימת", HttpStatus.BAD_REQUEST);
        return Dress;
    }

    async getDressByUserId(UserId: ObjectId): Promise<Dress[]> {
        const Dress = await this.DressModel.find({ _id: UserId });
        if (!Dress)
            throw new HttpException("משתמש לא קיים", HttpStatus.BAD_REQUEST);
        return Dress;
    }

    async updateDressDetails(DressId: ObjectId, Dress: Dress): Promise<Dress> {
        const existingDress = await this.getDressById(DressId);

        if (!existingDress)
            throw new HttpException("שמלה לא קיימת", HttpStatus.BAD_REQUEST);

        return await this.DressModel.findByIdAndUpdate(DressId, Dress, { new: true });
    }

    async deleteDress(DressId: ObjectId): Promise<Dress> {
        return await this.DressModel.findOneAndDelete({ _id: DressId });
    }
}
