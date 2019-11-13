import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotobikeListComponent } from './motobike-list.component';

describe('MotobikeListComponent', () => {
  let component: MotobikeListComponent;
  let fixture: ComponentFixture<MotobikeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotobikeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotobikeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
