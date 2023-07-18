import { TestBed } from '@angular/core/testing';
import { NgxsModule } from '@ngxs/store';

import { PortalGuard } from './portal.guard';

describe('PortalGuard', () => {
  let guard: PortalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([])],
    });
    guard = TestBed.inject(PortalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
