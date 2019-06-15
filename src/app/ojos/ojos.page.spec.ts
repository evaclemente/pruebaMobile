import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OjosPage } from './ojos.page';

describe('OjosPage', () => {
  let component: OjosPage;
  let fixture: ComponentFixture<OjosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OjosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OjosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
