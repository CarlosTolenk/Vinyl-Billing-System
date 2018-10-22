import { TestBed, inject } from '@angular/core/testing';

import { FormDataBillingService } from './form-data-billing.service';

describe('FormDataBillingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormDataBillingService]
    });
  });

  it('should be created', inject([FormDataBillingService], (service: FormDataBillingService) => {
    expect(service).toBeTruthy();
  }));
});
