import { Test, TestingModule } from '@nestjs/testing';
import { DealService } from './deals.service';

describe('DealService', () => {
  let service: DealService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DealService],
    }).compile();

    service = module.get<DealService>(DealService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
