import { Component, OnInit, inject } from '@angular/core';
import { MessageService, PhpData } from '../services/message.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface Cours {
  id: number;
  nom: string;
  nb_topics: number;
  nb_posts: number;
  last_message: string;
}


@Component({
  selector: 'app-cours',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.scss'
})
export class CoursComponent implements OnInit {
  cols: string[] = ['nom', 'nb_topics', 'nb_posts', 'last_message'];
  pageSize = 2;
  page = 1;
  courses: Cours[] = [];
  private messageService = inject(MessageService);
  private router = inject(Router);


  ngOnInit(): void {
    this.messageService.sendMessage('getCourses', {})
      .subscribe((response: PhpData) => {
        console.log('Courses:', response.data);
        this.courses = response.data as Cours[];
      });
  }

  get paginatedCourses() {
    const start = (this.page - 1) * this.pageSize;
    return this.courses.slice(start, start + this.pageSize);
  }

  get maxPage(): number {
    return Math.ceil(this.courses.length / this.pageSize) || 1;
  }

  get paginationLabel(): string {
    if (!this.courses.length) {
      return '0 - 0 of 0';
    }
    const start = (this.page - 1) * this.pageSize + 1;
    const end = Math.min(this.page * this.pageSize, this.courses.length);
    return `${start} - ${end} of ${this.courses.length}`;
  }

  goToTopics(course: Cours){
    this.router.navigate(['/topics', course.id]);
  }
}
