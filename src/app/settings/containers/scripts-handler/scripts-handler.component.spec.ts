import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerSiteService } from '@app/core/services/customer-site.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ScriptsHandlerComponent } from './scripts-handler.component';
import { NgxsModule } from '@ngxs/store';

describe('ScriptsHandlerComponent', () => {
  let component: ScriptsHandlerComponent;
  let fixture: ComponentFixture<ScriptsHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot([])],
      declarations: [ScriptsHandlerComponent],
      providers: [CustomerSiteService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptsHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
