import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFigureComponent } from './create-figure.component';

describe('CreateFigureComponent', () => {
  let component: CreateFigureComponent;
  let fixture: ComponentFixture<CreateFigureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFigureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
