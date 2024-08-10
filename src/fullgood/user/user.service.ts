import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, Status } from './user.dto';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class UserService {
        
    constructor(@InjectModel("User")private readonly userModel: Model<User>) { }

    async addUser(user: User): Promise<User> {
        const regexmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!regexmail.test(user.mail))
          throw new HttpException("מייל לא תקין", HttpStatus.BAD_REQUEST);
        if (await this.userModel.findOne({ mail: user.mail }))
          throw new HttpException("מייל זה קיים במערכת", HttpStatus.BAD_REQUEST);
        const newUser = new this.userModel(user);
        let save: User;
        if (newUser)
            save = await newUser.save();
        else
            throw new HttpException("המשתמש לא הוכנס למערכת", HttpStatus.BAD_REQUEST);
        return save;
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userModel.find();
    }

    async getUserById(userId: ObjectId): Promise<User> {
        const user = await this.userModel.findById({_id: userId});
        if(user.status === Status.DETACHED)
            throw new HttpException("המשתמש לא מחובר למערכת", HttpStatus.BAD_REQUEST);
        if(user.status === Status.BLOCKED)
            throw new HttpException("המשתמש נמחק", HttpStatus.BAD_REQUEST);
        return user;
    }

    async getUserByMailAndPassword(mail: string, password: string): Promise<User> {
        const user = await this.userModel.findOne({mail, password});
        if(user.status === Status.BLOCKED)
            throw new HttpException("המשתמש נמחק", HttpStatus.BAD_REQUEST);
        if(user)
            await this.userModel.findByIdAndUpdate(user, {status: Status.CONNECTED}, {new: true})
        else
            throw new HttpException("מייל או סיסמא שגויים", HttpStatus.BAD_REQUEST);
        return user;
    }

    async updateUserDetails(userId: ObjectId, user: User): Promise<User> {
        const user1 = this.getUserById(userId);
        return await this.userModel.findByIdAndUpdate(user1, user, {new: true});
    }

    async updateUserStatus(userId: ObjectId): Promise<User> {
        const user = this.getUserById(userId);
        return await this.userModel.findByIdAndUpdate(user, {status: Status.DETACHED}, {new: true});
    }

    async deleteUser(userId: ObjectId): Promise<User> {
        return await this.userModel.findByIdAndUpdate({_id: userId}, {status: Status.BLOCKED}, {new: true});
    }
}
