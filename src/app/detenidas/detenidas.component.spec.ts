import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetenidasComponent } from './detenidas.component';

describe('DetenidasComponent', () => {
  let component: DetenidasComponent;
  let fixture: ComponentFixture<DetenidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetenidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetenidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
