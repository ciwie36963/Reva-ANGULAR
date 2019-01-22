import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExhibitorComponent } from './add-exhibitor.component';

describe('AddExhibitorComponent', () => {
  let component: AddExhibitorComponent;
  let fixture: ComponentFixture<AddExhibitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExhibitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExhibitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
