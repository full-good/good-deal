import { Module } from '@nestjs/common';
import { DressController } from './dress.controller';
import { DressService } from './dress.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Dress, DressSchema } from './dress.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Dress.name, schema: DressSchema }]),],
  controllers: [DressController],
  providers: [DressService]
})
export class DressModule {}
