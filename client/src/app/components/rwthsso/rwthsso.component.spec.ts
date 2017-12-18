import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RwthssoComponent } from './rwthsso.component';

describe('RwthssoComponent', () => {
  let component: RwthssoComponent;
  let fixture: ComponentFixture<RwthssoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RwthssoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RwthssoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
