import { TestBed } from '@angular/core/testing';

import { BoardRowService } from './board-row.service';

describe('BoardRowService', () => {
  let service: BoardRowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardRowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
