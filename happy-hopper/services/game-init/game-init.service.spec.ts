import { TestBed } from '@angular/core/testing';

import { GameInitService } from './game-init.service';

describe('GameInitService', () => {
  let service: GameInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
