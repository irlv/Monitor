import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EProcessComponent } from './eprocess.component';

describe('EProcessComponent', () => {
  let component: EProcessComponent;
  let fixture: ComponentFixture<EProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
