import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TopicDialogComponent } from '../topic-dialog/topic-dialog.component';

@Component({
  selector: 'app-create-topic-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="btn-create-topic" (click)="openDialog()">
      Créer un nouveau sujet
    </button>`,
  styleUrl: './create-topic-dialog.component.scss'
})
export class CreateTopicDialogComponent {
  @Input() courseId: number | null = null;
  private dialog = inject(MatDialog);
  openDialog(){
    if (this.courseId === null){
      console.error('CourseId is null');
      return;
    }
    this.dialog.open(TopicDialogComponent, {
      width: '450px',
      data: {course: this.courseId}
    });
  }
}