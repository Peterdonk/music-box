import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstrumentCategoriesComponent } from './instrument-categories.component';

describe('InstrumentCategoriesComponent', () => {
  let component: InstrumentCategoriesComponent;
  let fixture: ComponentFixture<InstrumentCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstrumentCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstrumentCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
