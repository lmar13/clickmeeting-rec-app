import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickFigureComponent } from './pick-figure.component';

describe('PickFigureComponent', () => {
  let component: PickFigureComponent;
  let fixture: ComponentFixture<PickFigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickFigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
