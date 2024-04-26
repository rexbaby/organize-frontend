import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDistrictComponent } from './dialog-district.component';

describe('DialogDistrictComponent', () => {
  let component: DialogDistrictComponent;
  let fixture: ComponentFixture<DialogDistrictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDistrictComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDistrictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
