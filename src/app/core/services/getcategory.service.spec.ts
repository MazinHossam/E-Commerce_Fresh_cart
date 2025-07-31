import { TestBed } from '@angular/core/testing';

import { GetcategoryService } from './getcategory.service';

describe('GetcategoryService', () => {
  let service: GetcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
