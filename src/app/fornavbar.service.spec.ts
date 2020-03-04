import { TestBed } from '@angular/core/testing';

import { FornavbarService } from './fornavbar.service';

describe('FornavbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FornavbarService = TestBed.get(FornavbarService);
    expect(service).toBeTruthy();
  });
});
