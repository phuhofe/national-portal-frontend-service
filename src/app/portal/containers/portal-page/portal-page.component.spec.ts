import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { getTranslocoModule } from 'src/app/transloco-root/transloco-testing.module';

import { PortalPageComponent } from './portal-page.component';

describe('PortalPageComponent', () => {
  let component: PortalPageComponent;
  let fixture: ComponentFixture<PortalPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([]),
        getTranslocoModule()
      ],
      providers: [
        Title,
        Meta
      ],
      declarations: [ PortalPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
