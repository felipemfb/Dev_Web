import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { BreadcrumbService, BreadcrumbData } from '../services/breadcrumb.service';
import { MessageService } from '../services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { TopicDialogComponent, NewTopic } from '../topic-dialog/topic-dialog.component';
import { CreateTopicDialogComponent } from '../create-topic-dialog/create-topic-dialog.component';

export interface Topic {
  id: number;
  title: string;
  num_posts: number;
  last_message: string;
}

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [ CommonModule, FormsModule, BreadcrumbComponent, CreateTopicDialogComponent],
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.scss'
})

export class TopicsComponent implements OnInit {
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  private breadcrumbService = inject(BreadcrumbService);
  private messageService = inject(MessageService);
  courseId: number | null = null;
  topics: Topic[] = [];
  breadcrumb: BreadcrumbData[] = [];
  pageSize = 5;
  page = 1;
  

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    this.courseId = id ? Number(id) : null;
    if (this.courseId === null) return;

    this.messageService.sendMessage('getCourses', {})
      .subscribe(res => {
        const courses = res.data as any[];
        const currentCourse = courses.find(c => c.id == this.courseId);
        if (currentCourse) {
          this.breadcrumbService.setTopics(currentCourse.nom);
        }
        this.breadcrumb = this.breadcrumbService.getPath();
        this.loadTopics();
      });
  }

  loadTopics(){
    this.messageService.sendMessage('getTopics', {
      course: this.courseId
    }).subscribe(res => {
      console.log('Data:', res);
      this.topics = res.data || [];
    });
  }

  openDialog(){
    if (this.courseId === null) return;
    const dialogRef = this.dialog.open(TopicDialogComponent, {
      width: '450px',
      data: {course: this.courseId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.addTopic(result);
      }
    });
  }

  addTopic(newTopic: NewTopic){
    this.topics.unshift({
      id: newTopic.idTopic,
      title: newTopic.sujet,
      num_posts: 0,
      last_message: ''
    });
  }


  get paginatedTopics() {
    const start = (this.page - 1) * this.pageSize;
    return this.topics.slice(start, start + this.pageSize);
  }

  get maxPage(): number {
    return Math.ceil(this.topics.length / this.pageSize) || 1;
  }

  get paginationLabel(): string {
    if (!this.topics.length) return '0 - 0 of 0';
    const start = (this.page - 1) * this.pageSize + 1;
    const end = Math.min(this.page * this.pageSize, this.topics.length);

    return `${start} - ${end} of ${this.topics.length}`;
  }
}