import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BocaPage } from './boca.page';

describe('BocaPage', () => {
  let component: BocaPage;
  let fixture: ComponentFixture<BocaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BocaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BocaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
