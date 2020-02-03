import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyboardistComponent } from './keyboardist.component';

describe('KeyboardistComponent', () => {
  let component: KeyboardistComponent;
  let fixture: ComponentFixture<KeyboardistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KeyboardistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyboardistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
