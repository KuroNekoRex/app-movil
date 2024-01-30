import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoverRPage } from './recover-r.page';

describe('RecoverRPage', () => {
  let component: RecoverRPage;
  let fixture: ComponentFixture<RecoverRPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RecoverRPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
