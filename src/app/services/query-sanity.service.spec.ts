import { TestBed } from '@angular/core/testing';

import { QuerySanityService } from './query-sanity.service';

describe('QuerySanityService', () => {
  let service: QuerySanityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuerySanityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
