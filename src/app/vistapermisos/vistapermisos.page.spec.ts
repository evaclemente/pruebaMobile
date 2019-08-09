import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VistapermisosPage } from './vistapermisos.page';

describe('VistapermisosPage', () => {
  let component: VistapermisosPage;
  let fixture: ComponentFixture<VistapermisosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VistapermisosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VistapermisosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
