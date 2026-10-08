import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


export interface BreadcrumbData {
  nom: string;
  route: string;
}

@Injectable({
  providedIn: 'root'
})

export class BreadcrumbService {
  private breadcrumbSubject = new BehaviorSubject<BreadcrumbData[]>([]);
  breadcrumb$ = this.breadcrumbSubject.asObservable();
  setTopics(courseName: string): void {
    this.breadcrumbSubject.next([
      {nom: 'Tous les cours', route: '/cours'},
      {nom: courseName, route: ''}
    ]);
  }
  getPath(): BreadcrumbData[]{
    return this.breadcrumbSubject.value;
  }
}
