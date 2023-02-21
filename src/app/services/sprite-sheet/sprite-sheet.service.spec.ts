import { TestBed } from '@angular/core/testing';

import { SpriteSheetService } from './sprite-sheet.service';

describe('SpriteSheetService', () => {
  let service: SpriteSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpriteSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
