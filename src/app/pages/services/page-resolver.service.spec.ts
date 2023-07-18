import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { getTranslocoModule } from 'src/app/transloco-root/transloco-testing.module';

import { PageResolverService } from './page-resolver.service';

describe('PageResolverService', () => {
  let service: PageResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [getTranslocoModule(), HttpClientTestingModule],
    });
    service = TestBed.inject(PageResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
