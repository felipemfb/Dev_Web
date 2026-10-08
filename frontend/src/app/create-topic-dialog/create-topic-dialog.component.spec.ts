import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTopicDialogComponent } from './create-topic-dialog.component';

describe('CreateTopicDialogComponent', () => {
  let component: CreateTopicDialogComponent;
  let fixture: ComponentFixture<CreateTopicDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTopicDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateTopicDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
