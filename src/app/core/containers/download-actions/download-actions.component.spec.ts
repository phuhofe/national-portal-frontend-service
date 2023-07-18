import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadActionsComponent } from './download-actions.component';

describe('DownloadActionsComponent', () => {
  let component: DownloadActionsComponent;
  let fixture: ComponentFixture<DownloadActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
