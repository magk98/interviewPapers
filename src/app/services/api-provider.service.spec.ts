import { TestBed } from '@angular/core/testing';

import { ApiProviderService } from './api-provider.service';

describe('HttpProviderService', () => {
  let service: ApiProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
