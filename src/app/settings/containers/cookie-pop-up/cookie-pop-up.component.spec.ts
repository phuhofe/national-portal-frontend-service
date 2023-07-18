import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieService } from '@app/core/services/cookie.service';
import { NgxsModule } from '@ngxs/store';
import { getTranslocoModule } from 'src/app/transloco-root/transloco-testing.module';
import { PrivacyPolicyLinkPipe } from '../../pipe/privacy-policy-link.pipe';

import { CookiePopUpComponent } from './cookie-pop-up.component';

describe('CookiePopUpComponent', () => {
  let component: CookiePopUpComponent;
  let fixture: ComponentFixture<CookiePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([]),
        getTranslocoModule()
      ],
      providers: [
        CookieService
      ],
      declarations: [CookiePopUpComponent, PrivacyPolicyLinkPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
