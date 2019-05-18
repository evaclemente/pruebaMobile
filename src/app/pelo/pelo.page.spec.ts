import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeloPage } from './pelo.page';

describe('PeloPage', () => {
  let component: PeloPage;
  let fixture: ComponentFixture<PeloPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeloPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
