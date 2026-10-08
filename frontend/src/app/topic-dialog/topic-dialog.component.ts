import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MessageService } from '../services/message.service';

export interface NewTopic {
  idTopic: number;
  sujet: string;
}

@Component({
  selector: 'app-topic-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './topic-dialog.component.html',
  styleUrl: './topic-dialog.component.scss'
})
export class TopicDialogComponent {
  subject = '';
  errorMessage = '';
  private messageService = inject(MessageService);

  constructor(
    public dialogRef: MatDialogRef<TopicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { course: number }
  ) {}
  onCancel(){
    this.dialogRef.close();
  }

  createTopic(){
    this.messageService.sendMessage('saveNewTopic', {
      course: this.data.course,
      subject: this.subject
    }).subscribe(res => {
      console.log('Response:', res);
      if (res.status === 'error'){
        this.errorMessage = res.data?.reason ?? res.data?.message ?? res.data?.error ?? 'Unknown Error';
        return;
      }
      const result: NewTopic = {
        idTopic: res.data.idTopic,
        sujet: this.subject
      };
      this.dialogRef.close(result);
    });
  }
}