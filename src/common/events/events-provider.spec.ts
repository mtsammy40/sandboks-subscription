import { Test, TestingModule } from '@nestjs/testing';
import { EventsProvider } from './events-provider';

describe('EventsProvider', () => {
  let provider: EventsProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsProvider],
    }).compile();

    provider = module.get<EventsProvider>(EventsProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
