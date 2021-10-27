import { TestBed } from '@angular/core/testing';

import { ServiceApiAmazonService } from './service-api-amazon.service';

describe('ServiceApiAmazonService', () => {
  let service: ServiceApiAmazonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceApiAmazonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
