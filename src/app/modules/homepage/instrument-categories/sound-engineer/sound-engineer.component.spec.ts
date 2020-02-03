import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundEngineerComponent } from './sound-engineer.component';

describe('SoundEngineerComponent', () => {
  let component: SoundEngineerComponent;
  let fixture: ComponentFixture<SoundEngineerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundEngineerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundEngineerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
