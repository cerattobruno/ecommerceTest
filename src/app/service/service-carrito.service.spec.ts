import { TestBed } from '@angular/core/testing';

import { ServiceCarritoService } from './service-carrito.service';

describe('ServiceCarritoService', () => {
  let service: ServiceCarritoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCarritoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
