import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrumpeterComponent } from './trumpeter.component';

describe('TrumpeterComponent', () => {
  let component: TrumpeterComponent;
  let fixture: ComponentFixture<TrumpeterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrumpeterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrumpeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
