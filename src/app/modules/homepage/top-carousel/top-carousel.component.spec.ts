import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCarouselComponent } from './top-carousel.component';

describe('TopCarouselComponent', () => {
  let component: TopCarouselComponent;
  let fixture: ComponentFixture<TopCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
