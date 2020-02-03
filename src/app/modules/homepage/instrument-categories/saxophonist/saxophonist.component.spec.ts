import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaxophonistComponent } from './saxophonist.component';

describe('SaxophonistComponent', () => {
  let component: SaxophonistComponent;
  let fixture: ComponentFixture<SaxophonistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaxophonistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaxophonistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
