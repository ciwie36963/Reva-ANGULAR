import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaliseExhibitorComponent } from './localise-exhibitor.component';

describe('LocaliseExhibitorComponent', () => {
  let component: LocaliseExhibitorComponent;
  let fixture: ComponentFixture<LocaliseExhibitorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocaliseExhibitorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaliseExhibitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
