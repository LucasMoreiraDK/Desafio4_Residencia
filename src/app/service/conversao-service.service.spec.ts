import { TestBed } from '@angular/core/testing';

import { ConversaoServiceService } from './conversao-service.service';

describe('ConversaoServiceService', () => {
  let service: ConversaoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConversaoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
