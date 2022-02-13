import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
    service.setItem('KEY1', 'Value1');
    service.setItem('KEY2', 'Value2');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get value in local storage', () => {
    expect(service.getItem('KEY1')).toEqual('Value1');
  });

  it('should remove value from local storage', () => {
    service.removeItem('KEY1')
    expect(service.getItem('KEY1')).toBeNull()
  })
});
