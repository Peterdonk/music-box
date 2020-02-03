import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadGuitaristComponent } from './lead-guitarist.component';

describe('LeadGuitaristComponent', () => {
  let component: LeadGuitaristComponent;
  let fixture: ComponentFixture<LeadGuitaristComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadGuitaristComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadGuitaristComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
