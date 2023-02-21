import { TestBed } from '@angular/core/testing';

import { GameSpriteService } from './game-sprite.service';

describe('SpriteService', () => {
  let service: GameSpriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameSpriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
