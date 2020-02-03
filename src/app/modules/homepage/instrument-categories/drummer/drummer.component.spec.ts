import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrummerComponent } from './drummer.component';

describe('DrummerComponent', () => {
  let component: DrummerComponent;
  let fixture: ComponentFixture<DrummerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrummerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrummerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
