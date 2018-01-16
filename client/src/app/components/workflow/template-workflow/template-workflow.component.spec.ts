import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateWorkflowComponent } from './template-workflow.component';

describe('TemplateWorkflowComponent', () => {
  let component: TemplateWorkflowComponent;
  let fixture: ComponentFixture<TemplateWorkflowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateWorkflowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
