import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationCornerComponent } from './creation-corner.component';

describe('CreationCornerComponent', () => {
  let component: CreationCornerComponent;
  let fixture: ComponentFixture<CreationCornerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationCornerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
