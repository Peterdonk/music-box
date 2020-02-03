import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BassGuitaristComponent } from './bass-guitarist.component';

describe('BassGuitaristComponent', () => {
  let component: BassGuitaristComponent;
  let fixture: ComponentFixture<BassGuitaristComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BassGuitaristComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BassGuitaristComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
