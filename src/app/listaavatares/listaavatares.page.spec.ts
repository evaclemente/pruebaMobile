import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaavataresPage } from './listaavatares.page';

describe('ListaavataresPage', () => {
  let component: ListaavataresPage;
  let fixture: ComponentFixture<ListaavataresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaavataresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaavataresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
