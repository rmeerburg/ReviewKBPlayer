import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RatePlayerComponent } from './rate-player.component';

describe('ReviewPlayerComponent', () => {
  let component: RatePlayerComponent;
  let fixture: ComponentFixture<RatePlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RatePlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RatePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
