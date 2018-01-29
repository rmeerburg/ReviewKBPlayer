import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPlayerComponent } from './review-player.component';

describe('ReviewPlayerComponent', () => {
  let component: ReviewPlayerComponent;
  let fixture: ComponentFixture<ReviewPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
