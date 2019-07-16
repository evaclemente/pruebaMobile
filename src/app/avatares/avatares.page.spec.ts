import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvataresPage } from './avatares.page';

describe('AvataresPage', () => {
  let component: AvataresPage;
  let fixture: ComponentFixture<AvataresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvataresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvataresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
