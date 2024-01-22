import { TestBed } from '@angular/core/testing';

import { WinRowService } from './win-row.service';

describe('WinRowService', () => {
  let service: WinRowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WinRowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
