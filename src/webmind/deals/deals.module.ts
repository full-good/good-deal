import { Module } from '@nestjs/common';
import { DealController } from './deals.controller';
import { DealService } from './deals.service';
import { Deal, DealSchema } from './deals.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Deal.name, schema: DealSchema }]),],
  controllers: [DealController],
  providers: [DealService]
})
export class DealModule {}
