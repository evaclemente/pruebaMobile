import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormpersonaPage } from './formpersona.page';

describe('FormpersonaPage', () => {
  let component: FormpersonaPage;
  let fixture: ComponentFixture<FormpersonaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormpersonaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormpersonaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
