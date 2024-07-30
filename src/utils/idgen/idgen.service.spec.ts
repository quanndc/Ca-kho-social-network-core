import { Test, TestingModule } from '@nestjs/testing';
import { IdgenService } from './idgen.service';

describe('IdgenService', () => {
  let service: IdgenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdgenService],
    }).compile();

    service = module.get<IdgenService>(IdgenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should generate a new id', () => {
    let newId = service.generateId();
    console.log(newId);
    expect(newId).toBeDefined();
  });
});
