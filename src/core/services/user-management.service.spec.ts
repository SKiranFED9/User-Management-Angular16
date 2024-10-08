import { TestBed } from '@angular/core/testing';

import { UserManagementService } from './user-management.service';
import { HttpClientModule } from '@angular/common/http';

describe('UserManagementService', () => {
  let service: UserManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(UserManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
