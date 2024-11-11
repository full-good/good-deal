import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.dto';
import { ObjectId } from 'mongoose';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post("")
    async addUser(@Body() user: User) {
      try {      
        return this.userService.addUser(user);
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Get("")
    async getAllUsers() {
      try {
        return this.userService.getAllUsers();
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Get("auth/:id")
    async getUserById(@Param('id') id: ObjectId) {
      try {
        return this.userService.getUserById(id);
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Get("login")
    async getUserByMailAndPassword(@Query('mail') mail: string, @Query('password') password: string) {      
      try {
        return this.userService.getUserByMailAndPassword(mail, password);
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
    @Put(":id")
    async updateUserDetails(@Param('id') id: ObjectId, @Body() user: User) {
      try {
        return this.userService.updateUserDetails(id, user);
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
    @Put("status/:id")
    async updateUserStatus(@Param('id') id: ObjectId) {
      try {
        return this.userService.updateUserStatus(id);
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
    @Delete(":id")
    async deleteUser(@Param('id') id: ObjectId) {
      try {
        return this.userService.deleteUser(id);
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}
