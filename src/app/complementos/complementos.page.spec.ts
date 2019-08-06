import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementosPage } from './complementos.page';

describe('ComplementosPage', () => {
  let component: ComplementosPage;
  let fixture: ComponentFixture<ComplementosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplementosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplementosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
