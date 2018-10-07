import { TestBed, inject } from '@angular/core/testing';

import { AjustesService } from './ajustes.service';

describe('AjustesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AjustesService]
    });
  });

  it('should be created', inject([AjustesService], (service: AjustesService) => {
    expect(service).toBeTruthy();
  }));
});
