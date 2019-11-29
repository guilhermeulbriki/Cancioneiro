import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VivenciaPage } from './vivencia.page';

describe('VivenciaPage', () => {
  let component: VivenciaPage;
  let fixture: ComponentFixture<VivenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VivenciaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VivenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
